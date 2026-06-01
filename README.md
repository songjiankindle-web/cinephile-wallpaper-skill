# Cinephile Wallpaper Skill

Generate high-aesthetic, non-photorealistic movie posters and wallpapers from real film titles.

This is a cross-agent skill. It focuses on finished poster delivery, numbered one-turn setup, film-tone analysis, randomized art-history style routing, visual-density control, user-uploaded image references, character-reference anchoring, and prop/object/scene identity locks.

## Install

Copy the `cinephile-wallpaper` folder into your agent's skills directory.

For Codex-style skills:

```text
~/.codex/skills/cinephile-wallpaper
```

## Start

```text
请问你想生成哪部电影的海报壁纸？
```

## Version

v1.02 stable release.

Current v1.02 behavior:

- fixed opening prompt;
- no shortcut generation: when the initial request already includes a film title, the skill must still ask the numbered setup and image-reference/design-request gate before research or generation;
- numbered one-turn setup with default memory for size, output folder, text mode, and generation mode;
- randomized `style_lane` and `style_variant` selection unless the user specifies a style;
- style selection is decoupled from film content: draw the style first with the weighted router, then bridge the film into that style; do not choose or explain style as "suitable for the film";
- weighted visual-density routing across `dense`, `balanced`, `sparse`, and `single_stroke`;
- 40% global boost for sparse/single-stroke density after film-profile weighting;
- real-object still-life lane for exact film props, with no recognizable faces;
- intentional negative space and one-point-focus poster logic, without confusing it with dead blank title areas;
- expanded classic art-history variants including impressionism, cubism, Chinese ink, and minimalism;
- fresh generation for every request unless the user explicitly asks to retrieve an old file;
- image-model poster generation only, with one unified prompt fallback when the agent has no image capability;
- image-reference gate before image generation: ask the user whether to upload images they want represented in the poster, including but not limited to characters, props, and scenes;
- character appearance workflow: if the user wants recognizable characters, use uploaded character stills/photos first and attach them as authoritative references;
- character reference-image workflow: use uploaded/acquired real stills or crops and attach them to image generation before claiming face restoration;
- key prop/object reference gates to avoid wrong film objects.

Version archive:

- `v0.99a`: previous release candidate before the required user-uploaded character-reference gate.
- `v0.99b`: release candidate with the character appearance gate and uploaded-reference-first workflow.
- `v1.0`: stable release with the broader image-reference gate for characters, props, and scenes.
- `v1.01`: stable bugfix release that prevents direct film-title requests from skipping the guided setup flow.
- `v1.02`: stable bugfix release that hardens random style routing and forbids suitability-based style choice explanations.

See `docs/迷影桌面 PRD v1.02.md` for the product spec.
