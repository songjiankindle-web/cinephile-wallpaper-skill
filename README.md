# Cinephile Wallpaper Skill

Generate high-aesthetic, non-photorealistic movie posters and wallpapers from real film titles.

This is a cross-agent skill. It focuses on finished poster delivery, numbered one-turn setup, film-tone analysis, style-lane routing, character-reference anchoring, and prop/object identity locks.

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
- numbered one-turn setup for size, output folder, text mode, generation mode, and default memory;
- fresh generation for every request unless the user explicitly asks to retrieve an old file;
- image-model poster generation only, with one unified prompt fallback when the agent has no image capability;
- character and key prop/object reference gates to avoid generic faces or wrong film objects.

See `docs/迷影桌面 PRD v0.99.md` for the product spec.
