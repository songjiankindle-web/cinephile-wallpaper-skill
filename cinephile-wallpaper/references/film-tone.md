# Film Tone Reference

Use this before choosing palette, brightness, contrast, lighting, or film-stock treatment.

## Goal

The wallpaper should inherit the film's visual temperament, not the agent's default taste. Do not make every serious film dark. Darkness is one option, not a quality signal.

## Research Steps

1. Identify the film's image system:
   - color or black-and-white;
   - dominant brightness: high-key, low-key, daylight, night, mixed;
   - contrast: soft, hard, misty, flat, chiaroscuro, neon, naturalistic;
   - color temperature: warm, cool, mixed, seasonal, industrial, pastel, saturated;
   - medium clues: film stock, digital, animation, silent-era texture, documentary texture, archival texture;
   - cinematographer or notable visual style when useful.
2. Compare tone with the film's emotional register:
   - comedy, youth, romance, everyday warmth, spiritual austerity, urban alienation, melodrama, action spectacle, myth, horror, satire, grief, absurdity.
3. Choose a tonal strategy that can surprise without betraying the film.
4. Record the reasoning in the visual brief.

## Tonal Strategies

Pick one primary strategy and one accent when useful:

- **High-key warm**: bright whites, honey, pale yellow, soft skin-adjacent warmth, open daylight.
- **Everyday natural color**: restrained but not gloomy; ordinary streets, rooms, clothes, and sky colors.
- **Pastel melancholy**: pale blue, dusty pink, mint, cream, lavender, soft grey.
- **Sun-bleached realism**: washed daylight, beige concrete, faded signs, hot highlights.
- **Black-and-white graphic**: pure value design, ink, charcoal, silver gelatin, paper grain.
- **Earth and icon**: ochre, umber, brick, rust, mineral red, old paper, temple-wall texture.
- **Saturated pop**: strong primary colors, comic-book blocking, bright graphic contrast.
- **Neon/metal spectacle**: electric color accents, metallic values, cosmic scale, but still designed rather than muddy.
- **Luminous spiritual**: gold leaf, white space, pale stone, candlelit warmth, icon-painting restraint.
- **Cold institutional**: green-grey, fluorescent, ceramic white, controlled and clinical.
- **Nocturne**: night or low-key palette only when the film's visual identity truly calls for it.

## Anti-Defaults

Avoid these unless the film specifically demands them:

- making serious cinema automatically dark;
- using black backgrounds as a shortcut to prestige;
- desaturating all dramas;
- putting every protagonist in a shadowy back-view silhouette;
- confusing tragedy with low exposure;
- turning colorful or warm films into noir;
- flattening animation, comedy, or action films into generic gloom.

## Prompt Pattern

```text
Base the tonal design on the film's own image language: [color/B&W],
[brightness], [contrast], [temperature], [medium/stock clue]. Use a
[tonal strategy] palette: [colors]. Avoid default dark noir treatment unless
it is native to the film. Keep the poster fine-art and graphic, with tonal
variation suited to the film's emotional register.
```

## Brief Fields To Add

Add this object inside `interpretation`:

```json
{
  "film_tone": {
    "color_system": "color | black-and-white | mixed | animation | unknown",
    "brightness": "high-key | mid-key | low-key | mixed",
    "contrast": "soft | hard | flat | chiaroscuro | graphic | mixed",
    "temperature": "warm | cool | neutral | mixed",
    "medium_clues": [],
    "tonal_strategy": "",
    "rationale": "",
    "avoid_tone": []
  }
}
```
