#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const textAliases = new Map([
  ["with_text", "with_text"],
  ["with text", "with_text"],
  ["model_text", "with_text"],
  ["带文字", "with_text"],
  ["文字", "with_text"],
  ["带片名文字", "with_text"],
  ["bilingual", "with_text"],
  ["双语", "with_text"],
  ["中英双语", "with_text"],
  ["no_text", "no_text"],
  ["no text", "no_text"],
  ["无文字", "no_text"],
  ["无字版", "no_text"],
  ["both", "both"],
  ["两者都要", "both"],
  ["都要", "both"],
]);

const modeAliases = new Map([
  ["agent_image_tool", "agent_image_tool"],
  ["current_agent", "agent_image_tool"],
  ["直接生成", "agent_image_tool"],
  ["使用当前 agent 的生图能力", "agent_image_tool"],
  ["image_skill", "image_skill"],
  ["external_api", "external_api"],
  ["外部 api", "external_api"],
  ["外部 API/生图工具", "external_api"],
  ["prompt_only", "prompt_only"],
  ["只要提示词", "prompt_only"],
  ["auto", "auto"],
]);

function expandHome(input) {
  if (!input) return input;
  if (input === "~") return os.homedir();
  if (input.startsWith("~/")) return path.join(os.homedir(), input.slice(2));
  return input;
}

function normalizeText(value) {
  if (typeof value !== "string") return "";
  return textAliases.get(value.trim()) || "";
}

function normalizeMode(value) {
  if (typeof value !== "string") return "";
  return modeAliases.get(value.trim()) || "";
}

function parseSize(value) {
  if (!value) return null;
  if (typeof value === "object" && Number(value.width) && Number(value.height)) {
    return {
      width: Number(value.width),
      height: Number(value.height),
      source: value.source || "saved_default",
      label: value.label || "",
    };
  }
  if (typeof value === "string") {
    const match = value.match(/(\d{3,5})\s*[xX×]\s*(\d{3,5})/);
    if (match) {
      return {
        width: Number(match[1]),
        height: Number(match[2]),
        source: "saved_default",
        label: value,
      };
    }
  }
  return null;
}

function preferencePaths(explicitPath) {
  const paths = [];
  if (explicitPath) paths.push(expandHome(explicitPath));
  if (process.env.CINEPHILE_PREFERENCES_PATH) {
    paths.push(expandHome(process.env.CINEPHILE_PREFERENCES_PATH));
  }

  paths.push(path.join(os.homedir(), ".codex", "skills", "cinephile-wallpaper", "preferences.json"));
  paths.push(path.join(os.homedir(), "Documents", "电影壁纸", "cinephile_preferences.json"));
  paths.push(path.join(os.homedir(), "Documents", "CinephileWallpaper", "settings", "preferences.json"));

  const seen = new Set();
  return paths.filter((p) => {
    if (!p || seen.has(p)) return false;
    seen.add(p);
    return true;
  });
}

function normalizePreferences(raw, sourcePath = "") {
  const repaired = [];
  const textOriginal = raw.default_text_variant ?? raw.text_variant ?? "";
  const modeOriginal = raw.default_generation_mode ?? raw.generation_mode ?? "";
  const text = normalizeText(textOriginal);
  const mode = normalizeMode(modeOriginal);
  if (textOriginal && text && textOriginal !== text) repaired.push("text_variant");
  if (modeOriginal && mode && modeOriginal !== mode) repaired.push("generation_mode");

  const size =
    parseSize(raw.default_size ?? raw.size) ||
    (Number(raw.default_width) && Number(raw.default_height)
      ? {
          width: Number(raw.default_width),
          height: Number(raw.default_height),
          source: raw.default_size_source || raw.size_source || "saved_default",
          label: raw.default_device || raw.default_size_label || "",
        }
      : null);
  const outputDir = raw.default_output_dir ?? raw.default_output_directory ?? raw.output_dir ?? "";

  return {
    loaded: true,
    path: sourcePath,
    normalized: repaired.length > 0,
    invalid_saved_values_repaired: repaired,
    default_size: size,
    default_output_dir: outputDir ? expandHome(outputDir) : "",
    default_text_variant: text,
    default_generation_mode: mode,
    updated_at: raw.updated_at || "",
  };
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getPreferences(explicitPath) {
  for (const candidate of preferencePaths(explicitPath)) {
    if (!fs.existsSync(candidate)) continue;
    const raw = readJson(candidate);
    const normalized = normalizePreferences(raw, candidate);
    if (normalized.normalized) savePreferences(candidate, normalized);
    return normalized;
  }
  return {
    loaded: false,
    path: preferencePaths(explicitPath)[0],
    normalized: false,
    invalid_saved_values_repaired: [],
    default_size: null,
    default_output_dir: "",
    default_text_variant: "",
    default_generation_mode: "",
    updated_at: "",
  };
}

function savePreferences(filePath, prefs) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const data = {
    default_size: prefs.default_size || null,
    default_output_dir: prefs.default_output_dir || "",
    default_text_variant: normalizeText(prefs.default_text_variant) || "with_text",
    default_generation_mode: normalizeMode(prefs.default_generation_mode) || "agent_image_tool",
    updated_at: new Date().toISOString(),
  };
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return data;
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (!item.startsWith("--")) {
      args._.push(item);
      continue;
    }
    const key = item.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] || "get";
  const explicitPath = args.path;
  if (command === "get") {
    console.log(JSON.stringify(getPreferences(explicitPath), null, 2));
    return;
  }
  if (command === "save") {
    const existing = getPreferences(explicitPath);
    const size = parseSize(args.size) || existing.default_size;
    if (size && args["size-source"]) size.source = args["size-source"];
    if (size && args["size-label"]) size.label = args["size-label"];
    const outputPath = explicitPath ? expandHome(explicitPath) : existing.path;
    const saved = savePreferences(outputPath, {
      default_size: size,
      default_output_dir: args["output-dir"] ? expandHome(args["output-dir"]) : existing.default_output_dir,
      default_text_variant: args["text-variant"] || existing.default_text_variant,
      default_generation_mode: args["generation-mode"] || existing.default_generation_mode,
    });
    console.log(JSON.stringify({ saved: true, path: outputPath, preferences: saved }, null, 2));
    return;
  }
  console.error("Usage: preferences.mjs get|save [--path file] [--size 3456x2234] [--output-dir dir] [--text-variant with_text] [--generation-mode agent_image_tool]");
  process.exit(2);
}

main();
