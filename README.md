# Cinephile Wallpaper Skill

Generate high-aesthetic, non-photorealistic movie posters and wallpapers from real film titles.

This is a cross-agent skill. It focuses on finished poster delivery, numbered one-turn setup, film-tone analysis, randomized art-history style routing, visual-density control, character-reference anchoring, and prop/object identity locks.

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

v0.99 release candidate.

Current v0.99 behavior:

- fixed opening prompt;
- numbered one-turn setup with default memory for size, output folder, text mode, and generation mode;
- randomized `style_lane` and `style_variant` selection unless the user specifies a style;
- weighted visual-density routing across `dense`, `balanced`, `sparse`, and `single_stroke`;
- 40% global boost for sparse/single-stroke density after film-profile weighting;
- real-object still-life lane for exact film props, with no recognizable faces;
- intentional negative space and one-point-focus poster logic, without confusing it with dead blank title areas;
- expanded classic art-history variants including impressionism, cubism, Chinese ink, and minimalism;
- fresh generation for every request unless the user explicitly asks to retrieve an old file;
- image-model poster generation only, with one unified prompt fallback when the agent has no image capability;
- character reference-image workflow: acquire/crop real stills and attach them to image generation for face restoration;
- key prop/object reference gates to avoid wrong film objects.

See `docs/迷影桌面 PRD v0.99.md` for the product spec.
