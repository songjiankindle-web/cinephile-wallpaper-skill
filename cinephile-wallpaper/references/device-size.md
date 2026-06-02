# Device Size Lookup

Use this when the user wants a wallpaper for a device but does not know the resolution.

## Flow

1. Use the provided device model, saved device preference, or current screen. Ask for the exact model only if the user specifically wants a device wallpaper and no model can be inferred.
2. Search the web for the device's official or widely verified screen resolution.
3. Prefer manufacturer specs over SEO pages.
4. Use the chosen size directly if confidence is high; ask only when sources conflict or confidence is low.
5. Record `size_source: "device_lookup"` and the source URL in the manifest.
6. Remember the confirmed resolution if preferences are enabled.
7. If current-screen detection is requested but the environment exposes only GPU/controller data and no concrete pixel width/height, do not invent a size and do not reuse "previous workflow" dimensions. Use a saved confirmed default only when the user accepted it; otherwise ask for dimensions or a device model.

## Notes

- Phone wallpapers are often portrait; keep orientation unless the user asks for landscape.
- If multiple resolutions are listed, prefer native pixel resolution.
- If the device has display scaling, prefer native resolution unless the user asked for a custom crop.
- If unsure, state uncertainty and ask the user to confirm.
