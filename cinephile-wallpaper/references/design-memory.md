# Design Memory

Use this reference when the user provides a design idea, custom style, preferred visual grammar, recurring motif, typography preference, avoid-list, or a new art style not already covered by the built-in style lanes.

## Goal

Learn the user's taste without adding extra confirmation turns. Design memory should make future runs feel more personal while preserving fresh generation, random style routing, and the two mandatory setup gates.

## When To Save

Save or update design memory when the user explicitly asks to remember, says this should become a default/preference, or gives a reusable design/style direction during the image-reference/design-request gate.

Examples:

- "以后都偏这种荒诞拼贴感"
- "记住我喜欢这种留白很多的水墨科幻"
- "这次用一种像旧录像损坏的蓝紫色噪点风格，以后也可以用"
- "我想要一种冷幽默、低饱和、像旧杂志印刷错位的海报"

If the user gives a one-off design request but does not ask to remember it, use it for the current run and save it only in the run manifest, not as a lasting preference.

## What To Save

Store compact structured entries, not long transcripts:

```json
{
  "design_memory": {
    "default_design_notes": [],
    "custom_style_profiles": [
      {
        "name": "",
        "aliases": [],
        "source_user_words": "",
        "visual_traits": [],
        "composition_traits": [],
        "palette_traits": [],
        "material_process": [],
        "typography_traits": [],
        "preferred_density": "",
        "avoid": [],
        "prompt_fragments": [],
        "created_at": "",
        "last_used_at": "",
        "use_count": 0
      }
    ],
    "recurring_avoid": [],
    "recurring_typography_preferences": [],
    "recurring_reference_preferences": []
  }
}
```

Keep entries short. A custom style profile should usually be 5-10 compact traits plus 1-3 prompt fragments.

## How To Use

- Show saved design/style defaults only in the image-reference/design-request turn, not in the base-settings turn.
- Let the user say `沿用我的设计偏好` / `use my design defaults`.
- If the user specifies a new style for the current run, it overrides random style routing for that run.
- If the user asks to remember a custom style, create or update a `custom_style_profile`.
- If the user does not specify a style but has saved design preferences, treat them as soft taste bias, not a mandatory style override, unless the user made them default.
- Do not let design memory cause repeated identical posters. It informs style grammar and constraints; each request still creates a fresh concept and image.

## Custom Style Not In Built-In Lanes

When the user names or describes a new style:

1. Give it a concise local name if the user did not.
2. Distill observable traits: color, texture, composition, mark-making, typography, density, rhythm, materials, forbidden looks.
3. Use it as `user_specified` style for the current run.
4. If the user wants it remembered, save it under `custom_style_profiles`.
5. Do not claim the built-in random style script selected it; user-specified style bypasses the random draw for that run.

## Storage

Use the same persistent preference file as setup defaults when available, such as:

```text
CinephileWallpaper/settings/preferences.json
```

If persistent storage is unavailable, say briefly that this agent cannot keep design memory across conversations, then continue with the current run.

Do not store secrets, private image files, or full reference images as design memory unless the user explicitly asks for a reusable local reference library.
