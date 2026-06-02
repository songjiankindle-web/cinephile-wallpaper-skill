# Cinephile Wallpaper Skill

Generate high-aesthetic, non-photorealistic posters and wallpapers from real film, TV, anime, tokusatsu, documentary, franchise, character, prop, and scene titles.

This is a cross-agent skill. It focuses on finished poster delivery, broad Chinese/English poster-request triggering, numbered one-turn setup, film/work-tone analysis, randomized art-history style routing, visual-density control, user-uploaded image references, character-reference anchoring, and prop/object/scene identity locks.

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

v1.03 stable release.

Current v1.03 behavior:

- broad trigger metadata for Chinese/English 海报, 电影海报, 影视海报, 角色海报, poster, and wallpaper requests, including TV/anime/tokusatsu works and characters such as “给我做一张《杰克奥特曼》的海报”;
- fixed opening prompt;
- no shortcut generation: when the initial request already includes a film title, the skill must still ask the numbered setup and image-reference/design-request gate before research or generation;
- fixed two-step guidance: ask base settings first, then ask image references/design requirements in a separate assistant turn; do not merge them;
- numbered one-turn setup with default memory for size, output folder, text mode, and generation mode;
- randomized `style_lane` and `style_variant` selection unless the user specifies a style;
- style selection is decoupled from film content: draw the style first with the weighted router, then bridge the film into that style; do not choose or explain style as "suitable for the film";
- random style selection now uses `cinephile-wallpaper/scripts/draw-style.mjs`, a film-input-free draw script that records random source, rolls, effective weights, and `film_inputs_used_for_style: false`;
- image references are identity-only anchors: character references preserve likeness and role identity, but pose, expression, scale, placement, lighting, and composition must be redesigned;
- the selected art style must transform characters themselves, not only backgrounds or props;
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
- `v1.03`: current stable release, carrying forward two-step guidance, independent style draw, identity-only references, and strong character stylization.

See `docs/迷影桌面 PRD v1.03.md` for the product spec.
