#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, "..");

const profiles = {
  neutral: { dense: 10, balanced: 35, sparse: 35, single_stroke: 20 },
  commercial_action: { dense: 25, balanced: 30, sparse: 30, single_stroke: 15 },
  martial_arts_or_wuxia: { dense: 20, balanced: 30, sparse: 35, single_stroke: 15 },
  art_cinema_classic: { dense: 5, balanced: 25, sparse: 45, single_stroke: 25 },
  science_fiction_austere: { dense: 5, balanced: 25, sparse: 45, single_stroke: 25 },
  science_fiction_spectacle: { dense: 18, balanced: 30, sparse: 35, single_stroke: 17 },
  psychological_or_horror: { dense: 10, balanced: 25, sparse: 40, single_stroke: 25 },
  historical_epic_or_social_panorama: { dense: 25, balanced: 30, sparse: 30, single_stroke: 15 },
  quiet_drama_or_romance: { dense: 5, balanced: 30, sparse: 45, single_stroke: 20 },
  experimental_or_essay: { dense: 5, balanced: 25, sparse: 45, single_stroke: 25 },
  large_ensemble_or_comedy: { dense: 25, balanced: 30, sparse: 30, single_stroke: 15 }
};

const minimalFloors = {
  commercial_action: 45,
  martial_arts_or_wuxia: 50,
  historical_epic_or_social_panorama: 45,
  large_ensemble_or_comedy: 45,
  science_fiction_spectacle: 50,
  neutral: 55,
  art_cinema_classic: 65,
  science_fiction_austere: 65,
  psychological_or_horror: 60,
  quiet_drama_or_romance: 65,
  experimental_or_essay: 65
};

const instructions = {
  dense: {
    max_primary_elements: 4,
    detail_budget: "high_but_hierarchical",
    quiet_area_ratio: "10-25%",
    density_prompt_instruction: "layered but strictly hierarchical detail; one dominant first read; no equal-weight all-over clutter"
  },
  balanced: {
    max_primary_elements: 2,
    detail_budget: "medium_low",
    quiet_area_ratio: "30-50%",
    density_prompt_instruction: "one dominant subject plus at most one supporting sign; readable negative space; no decorative background fragments"
  },
  sparse: {
    max_primary_elements: 1,
    detail_budget: "low",
    quiet_area_ratio: "50-75%",
    density_prompt_instruction: "one dominant visual sign only; large intentional negative space; minimal supporting texture"
  },
  single_stroke: {
    max_primary_elements: 1,
    detail_budget: "very_low",
    quiet_area_ratio: "70%+",
    density_prompt_instruction: "one decisive object, gesture, mark, or face fragment; radical quiet field; no secondary story elements"
  }
};

function parseArgs(argv) {
  const args = {
    profile: "neutral",
    weights: "",
    history: path.join(skillRoot, ".cache", "density-history.json"),
    recentWindow: 4,
    noHistory: false,
    userDensity: ""
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--profile") args.profile = argv[++i] || "neutral";
    else if (arg === "--weights") args.weights = argv[++i] || "";
    else if (arg === "--history") args.history = argv[++i];
    else if (arg === "--recent-window") args.recentWindow = Number(argv[++i]);
    else if (arg === "--no-history") args.noHistory = true;
    else if (arg === "--user-density") args.userDensity = argv[++i] || "";
  }
  return args;
}

function readHistory(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return [];
  }
}

function writeHistory(file, entries) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(entries.slice(-80), null, 2)}\n`);
}

function normalize(weights) {
  const entries = Object.entries(weights).map(([key, value]) => [key, Math.max(0, Number(value) || 0)]);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  if (total <= 0) return { ...profiles.neutral };
  return Object.fromEntries(entries.map(([key, value]) => [key, Number(((value / total) * 100).toFixed(4))]));
}

function parseWeightJson(value) {
  if (!value.trim()) return null;
  try {
    const parsed = JSON.parse(value);
    const result = {};
    for (const key of ["dense", "balanced", "sparse", "single_stroke"]) {
      if (parsed[key] !== undefined) result[key] = Number(parsed[key]);
    }
    return Object.keys(result).length ? result : null;
  } catch {
    return null;
  }
}

function applyMinimalFloor(weights, profile) {
  const floor = minimalFloors[profile] ?? minimalFloors.neutral;
  const currentMinimal = weights.sparse + weights.single_stroke;
  if (currentMinimal >= floor) {
    return { weights, minimal_floor: floor, minimal_floor_applied: false };
  }

  const needed = floor - currentMinimal;
  const donorTotal = weights.dense + weights.balanced;
  if (donorTotal <= 0) {
    return { weights, minimal_floor: floor, minimal_floor_applied: false };
  }

  const takeDense = needed * (weights.dense / donorTotal);
  const takeBalanced = needed * (weights.balanced / donorTotal);
  const next = {
    dense: Math.max(0, weights.dense - takeDense),
    balanced: Math.max(0, weights.balanced - takeBalanced),
    sparse: weights.sparse + needed * 0.72,
    single_stroke: weights.single_stroke + needed * 0.28
  };
  return { weights: normalize(next), minimal_floor: floor, minimal_floor_applied: true };
}

function applyRecentCorrection(weights, recent) {
  const recentModes = recent.map((entry) => entry.mode);
  const lastThree = recentModes.slice(-3);
  const highCount = lastThree.filter((mode) => mode === "dense" || mode === "balanced").length;
  const corrections = [];
  let next = { ...weights };

  if (recentModes.at(-1) === "dense") {
    next.dense = 0;
    corrections.push("last_dense_suppressed");
  }

  if (highCount >= 2) {
    const denseCut = next.dense * 0.6;
    const balancedCut = next.balanced * 0.35;
    next.dense -= denseCut;
    next.balanced -= balancedCut;
    next.sparse += denseCut * 0.65 + balancedCut * 0.7;
    next.single_stroke += denseCut * 0.35 + balancedCut * 0.3;
    corrections.push("recent_high_density_shifted_to_minimal");
  }

  if (
    recentModes.length >= 2
    && recentModes.slice(-2).every((mode) => mode === "sparse" || mode === "single_stroke")
  ) {
    corrections.push("recent_minimal_streak_kept_no_penalty");
  }

  return { weights: normalize(next), corrections };
}

function drawWeighted(weightTable) {
  const entries = Object.entries(weightTable).filter(([, weight]) => weight > 0);
  const scale = 10000;
  const scaled = entries.map(([key, weight]) => [key, Math.round(weight * scale)]);
  const total = scaled.reduce((sum, [, weight]) => sum + weight, 0);
  const roll = crypto.randomInt(total);
  let cursor = 0;
  for (const [key, weight] of scaled) {
    cursor += weight;
    if (roll < cursor) return { value: key, roll, total };
  }
  return { value: scaled.at(-1)[0], roll, total };
}

const args = parseArgs(process.argv.slice(2));
const allowedModes = ["dense", "balanced", "sparse", "single_stroke"];

if (args.userDensity.trim()) {
  const mode = args.userDensity.trim();
  if (!allowedModes.includes(mode)) {
    console.error(`Unknown density mode: ${mode}`);
    process.exit(1);
  }
  const result = {
    mode,
    selection_mode: "user_specified",
    profile: args.profile,
    density_weights: null,
    random_source: "none_user_specified",
    minimalism_floor_applied: false,
    recent_corrections: [],
    ...instructions[mode],
    drawn_at: new Date().toISOString()
  };
  if (!args.noHistory) {
    const history = readHistory(args.history);
    writeHistory(args.history, [...history, result]);
  }
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

const customWeights = parseWeightJson(args.weights);
const profile = profiles[args.profile] ? args.profile : "neutral";
const baseWeights = normalize(customWeights || profiles[profile]);
const history = args.noHistory ? [] : readHistory(args.history);
const recent = history.slice(-args.recentWindow);
const floorResult = applyMinimalFloor(baseWeights, profile);
const correctionResult = applyRecentCorrection(floorResult.weights, recent);
const draw = drawWeighted(correctionResult.weights);

const result = {
  mode: draw.value,
  selection_mode: "weighted_random_script",
  profile,
  base_density_weights: baseWeights,
  effective_density_weights: correctionResult.weights,
  minimalism_floor: floorResult.minimal_floor,
  minimalism_floor_applied: floorResult.minimal_floor_applied,
  recent_window: args.recentWindow,
  recent_modes: recent.map((entry) => entry.mode),
  recent_corrections: correctionResult.corrections,
  random_source: "node_crypto.randomInt",
  density_roll: draw.roll,
  density_total: draw.total,
  ...instructions[draw.value],
  drawn_at: new Date().toISOString()
};

if (!args.noHistory) {
  writeHistory(args.history, [...history, result]);
}

console.log(JSON.stringify(result, null, 2));
