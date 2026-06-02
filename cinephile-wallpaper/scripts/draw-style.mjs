#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, "..");

const weights = {
  impressionist_light_field: 11,
  fragmented_modernism: 10,
  expressive_color: 9,
  geometric_avant_garde: 8,
  conceptual_dada_surreal: 8,
  east_asian_ink: 8,
  renaissance_baroque_allegory: 7,
  medieval_icon_glass: 6,
  ukiyo_e_flatworld: 6,
  print_process: 6,
  pop_repetition_media: 5,
  minimalist_reduction: 5,
  gongbi_miniature: 4,
  social_mural_realism: 3,
  material_arte_povera: 2,
  textile_tapestry_map: 1,
  optical_digital_signal: 1,
  real_object_still_life: 0
};

const variants = {
  impressionist_light_field: [
    "broken-color plein-air field",
    "post-impressionist contour and vibrating color",
    "pointillist optical dots",
    "nocturne light haze"
  ],
  fragmented_modernism: [
    "analytic cubist planes",
    "synthetic cubist collage",
    "futurist motion fracture",
    "faceted multi-view portrait/object"
  ],
  expressive_color: [
    "fauvist contour and liberated color",
    "expressionist raw figure-ground",
    "neo-expressionist mark field",
    "wild complementary color clash"
  ],
  geometric_avant_garde: [
    "constructivist diagonal system",
    "suprematist floating geometry",
    "Bauhaus primary-form grid",
    "De Stijl hard-edge reduction"
  ],
  conceptual_dada_surreal: [
    "Dada object displacement",
    "surreal impossible-room logic",
    "diagrammatic conceptual apparatus",
    "deadpan collage paradox"
  ],
  east_asian_ink: [
    "Chinese ink wash with dry brush",
    "literati blankness and paper grain",
    "splashed-ink abstraction",
    "nihonga mineral haze"
  ],
  renaissance_baroque_allegory: [
    "Renaissance fresco grouping",
    "Baroque chiaroscuro staging",
    "classical allegorical tableau",
    "tenebrism with symbolic anatomy"
  ],
  medieval_icon_glass: [
    "Byzantine icon flatness",
    "Gothic stained-glass tesserae",
    "illuminated manuscript margin logic",
    "gold-ground sacred diagram"
  ],
  ukiyo_e_flatworld: [
    "ukiyo-e seasonal framing",
    "kabuki theatrical contour",
    "flat patterned textile planes",
    "woodblock wave/cloud geometry"
  ],
  print_process: [
    "woodcut black-line carving",
    "linocut limited-color poster",
    "etching crosshatch texture",
    "risograph misregistration"
  ],
  pop_repetition_media: [
    "screen-print halftone repetition",
    "commercial flat-color icon grid",
    "Ben-Day dot media surface",
    "repeated object celebrity system"
  ],
  minimalist_reduction: [
    "hard-edge single sign",
    "large quiet field with one charged object",
    "sparse geometric balance",
    "monochrome reduction with tiny rupture"
  ],
  gongbi_miniature: [
    "Chinese gongbi precise line",
    "Persian miniature dense symbolic field",
    "Indian miniature profile space",
    "mineral-color ornamental precision"
  ],
  social_mural_realism: [
    "Mexican mural public tableau",
    "Russian realist gravity",
    "Soviet poster force",
    "collective historical fresco"
  ],
  material_arte_povera: [
    "ash cloth copper ritual",
    "found-material assemblage",
    "worn paper rope earth texture",
    "humble material shrine"
  ],
  textile_tapestry_map: [
    "woven tapestry scene logic",
    "embroidered contour map",
    "cartographic textile grid",
    "threaded symbolic panorama"
  ],
  optical_digital_signal: [
    "op-art interference grid",
    "CRT scanline signal field",
    "VHS chroma noise",
    "cybernetic diagram distortion"
  ],
  real_object_still_life: [
    "exact prop still life under controlled light",
    "tactile real-object study",
    "material close-up with no visible face"
  ]
};

function parseArgs(argv) {
  const args = {
    history: path.join(skillRoot, ".cache", "style-history.json"),
    recentWindow: 5,
    noHistory: false,
    userStyle: ""
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--history") args.history = argv[++i];
    else if (arg === "--recent-window") args.recentWindow = Number(argv[++i]);
    else if (arg === "--no-history") args.noHistory = true;
    else if (arg === "--user-style") args.userStyle = argv[++i] || "";
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
  fs.writeFileSync(file, `${JSON.stringify(entries.slice(-50), null, 2)}\n`);
}

function drawWeighted(weightTable) {
  const entries = Object.entries(weightTable).filter(([, weight]) => weight > 0);
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  const roll = crypto.randomInt(total);
  let cursor = 0;
  for (const [lane, weight] of entries) {
    cursor += weight;
    if (roll < cursor) return { value: lane, roll, total };
  }
  return { value: entries.at(-1)[0], roll, total };
}

function drawVariant(lane) {
  const list = variants[lane] || ["default visible mechanism"];
  const index = crypto.randomInt(list.length);
  return { value: list[index], index, count: list.length };
}

const args = parseArgs(process.argv.slice(2));

if (args.userStyle.trim()) {
  const result = {
    style_selection_mode: "user_specified",
    style_lane: "user_specified",
    style_variant: args.userStyle.trim(),
    random_source: "none_user_specified",
    decoupled_from_film_content: true,
    film_inputs_used_for_style: false,
    note: "User specified the style; no random draw was used."
  };
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

const history = args.noHistory ? [] : readHistory(args.history);
const recent = history.slice(-args.recentWindow).map((entry) => entry.style_lane);
const effectiveWeights = { ...weights };
const suppressed_recent_lanes = [];

for (const lane of new Set(recent)) {
  if (effectiveWeights[lane] > 0) {
    effectiveWeights[lane] = 0;
    suppressed_recent_lanes.push(lane);
  }
}

if (Object.values(effectiveWeights).every((weight) => weight <= 0)) {
  for (const [lane, weight] of Object.entries(weights)) effectiveWeights[lane] = weight;
  suppressed_recent_lanes.length = 0;
}

const laneDraw = drawWeighted(effectiveWeights);
const variantDraw = drawVariant(laneDraw.value);

const result = {
  style_selection_mode: "weighted_random_script",
  style_lane: laneDraw.value,
  style_variant: variantDraw.value,
  style_weights: weights,
  effective_style_weights: effectiveWeights,
  suppressed_recent_lanes,
  recent_window: args.recentWindow,
  random_source: "node_crypto.randomInt",
  lane_roll: laneDraw.roll,
  lane_total: laneDraw.total,
  variant_roll: variantDraw.index,
  variant_total: variantDraw.count,
  decoupled_from_film_content: true,
  film_inputs_used_for_style: false,
  drawn_at: new Date().toISOString()
};

if (!args.noHistory) {
  writeHistory(args.history, [...history, result]);
}

console.log(JSON.stringify(result, null, 2));
