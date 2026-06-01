# Style Distillation

## Principle

Create fine-art poster concepts, not literal stills or live-action realism. Distill influences into design operations:

- negative space;
- symbolic compression;
- graphic silhouette;
- restricted palette;
- texture system;
- typographic-safe zones;
- rhythm and repetition;
- visual metaphor;
- abstraction;
- semiotic layering;
- historical or cultural style transposition;
- controlled contradiction between film subject and art language;
- painterly or graphic media.

Avoid direct imitation of one living artist. If referencing an artist, movement, studio, or era, translate the reference into observable design traits.

## Poster Grammar Bank

Use these as ingredients, not labels:

- **Mid-century modern poster**: flat color fields, strong diagonals, rough paper texture, bold symbolic reduction.
- **Film festival key visual**: restrained typography zone, abstract central image, contemporary editorial palette.
- **Criterion-like restraint**: quiet negative space, one dominant symbol, archival texture, minimal metadata.
- **MUBI-like editorial**: unexpected crop, modern color block, one precise object or gesture.
- **Japanese mini-theater flyer**: asymmetry, paper grain, delicate type spacing, poetic object focus.
- **Constructivist influence**: geometry, tension, limited palette, dynamic angular composition.
- **Noir graphic language**: shadow planes, blinds, smoke, hard contrast, fractured silhouettes.
- **Surreal symbolic poster**: impossible object, dream logic, restrained background, uncanny scale.
- **Oil-paint poster**: painterly planes, visible brushwork, rich shadows, non-photoreal human form.
- **Gouache/acrylic poster**: matte color, simplified shapes, hand-painted surfaces.
- **Sketch/charcoal poster**: expressive line, tonal blocks, unfinished edges, psychological intensity.
- **Pop art poster**: bold flat color, halftone rhythm, graphic face/object treatment, not celebrity realism.
- **Abstract expressionist field**: gestural pressure, large color fields, scraped texture, emotional force without literal scene depiction.
- **Suprematist/minimal abstraction**: floating geometric forms, radical emptiness, spatial tension, limited color.
- **Cubist fracture**: multiple viewpoints, faceted faces/objects, broken perspective, analytical structure.
- **Fauvist heat**: unnatural expressive color, rough contour, emotional palette over natural color.
- **Dada/Surreal collage**: found-shape logic, absurd scale, discontinuity, poetic collision.
- **Bauhaus/Swiss modernist system**: grid discipline, typography-safe geometry, primary forms, rational rhythm.
- **Op art/kinetic visual field**: optical vibration, repetition, warped grids, perception as subject.
- **Arte povera/material poster**: humble material texture, dust, cloth, metal, rope, paper, ash, earth.
- **Neo-expressionist figure**: raw mark-making, distorted body, psychological color, aggressive surface.
- **Conceptual art poster**: idea-first image, sparse objects, diagram logic, negative space, dry tension.
- **Ukiyo-e transposition**: flat planes, elegant contour, patterned fabric, seasonal atmosphere, theatrical framing.
- **Chinese ink literati**: empty space, brush rhythm, mist, mountain/water metaphor, restrained emotional pressure.
- **Chinese gongbi**: precise line, mineral color, ornamental discipline, symbolic plants/objects, controlled stillness.
- **Medieval illuminated manuscript**: gold ground, marginal symbols, flattened sacred space, ornamental borders.
- **Renaissance/classical allegory**: balanced composition, humanist anatomy translated into painted poster allegory.
- **Russian realist/Repin-school gravity**: social weight, earthy palette, expressive faces, moral drama, painterly realism without photography.
- **Huang Hai-inspired Chinese poster grammar**: see `artist-grammars.md`; use distilled design operations, not direct imitation.

## Art Direction Matrix

Default behavior: draw one primary art language and one secondary device with weighted randomness unless the user explicitly names a style. Film analysis should decide what appears in the poster, not which art-history style is allowed. The random style may create productive counterpoint; keep it unless it makes the film unrecognizable or violates user constraints.

Avoid safe illustration as the default. When an output stays conventional, escalate by choosing from the stronger sets below and writing the escalation directly into the prompt.

### Modern And Contemporary

- impressionism;
- post-impressionism;
- pointillism;
- Symbolism;
- abstraction;
- abstract expressionism;
- color-field painting;
- constructivism;
- suprematism;
- cubism, including analytic cubism, synthetic cubism, and Picasso/Braque-style fractured planes described as observable traits rather than direct copying;
- futurism;
- fauvism;
- dada;
- surrealism;
- Bauhaus;
- De Stijl;
- pop art;
- op art;
- minimalism;
- conceptual art;
- neo-expressionism;
- arte povera;
- brutalist graphic design;
- postmodern collage;
- vaporwave or digital glitch when justified.

### Pre-Modern, Classical, And Regional

- ancient Egyptian wall painting;
- Greek vase painting;
- Roman fresco and mosaic;
- medieval illuminated manuscript;
- Byzantine icon;
- Gothic stained glass;
- Renaissance fresco;
- Baroque chiaroscuro painting;
- neoclassical allegory;
- Romantic landscape;
- Russian realist / Repin-school social painting;
- Japanese ukiyo-e;
- Japanese nihonga;
- Chinese ink wash;
- Chinese literati painting;
- Chinese gongbi;
- Tibetan thangka structure;
- Persian miniature;
- Indian miniature painting;
- Art Nouveau;
- Art Deco;
- Soviet poster art;
- Mexican muralism.
- Chinese ink wash;
- Chinese literati painting;
- Chinese splashed-ink / pomo ink;
- Zen ink painting;

### Material And Process

- woodcut;
- lithograph;
- risograph;
- screen print;
- etching;
- torn-paper collage;
- textile/tapestry;
- ceramic glaze;
- gold leaf;
- charcoal and pastel;
- fresco wall;
- stained glass;
- blueprint/technical diagram;
- archival photocopy;
- thermal print;
- degraded VHS or CRT texture when film-appropriate.

## Style Router

Every generation must choose one `style_lane` before writing the prompt. Do not default to generic terms like `fine-art poster`, `painterly`, `cinematic`, `beautiful illustration`, or `movie poster style` as the main style.

Default selection method:

1. If the user names a style, use it.
2. Otherwise draw one `style_lane` with the weighted table below. Use a host random function when available; if not, use the current timestamp or pick from the boosted classic fine-art lanes before choosing safer contemporary poster lanes.
3. Then draw a narrower `style_variant` inside that lane by the same method.
4. Use film research only to choose the poster's elements, characters, props, symbols, tone references, and metaphor.
5. Do not replace the random style with a "more suitable" or safer style unless it would make the film unrecognizable or violate a user instruction.
6. Do not inspect prior generated outputs as a cache, and do not return an old result for a repeated film request.

Record the weighted draw in the manifest:

```json
{
  "style_selection_mode": "user_specified | weighted_random | corrective",
  "style_lane": "",
  "style_variant": "",
  "style_weights": {},
  "classic_style_boost_applied": true,
  "random_style_kept": true
}
```

## Style Weights

The skill was producing too few visibly classic fine-art styles. Unless the user specifies a style, use this baseline weighted distribution. The "classic fine-art boost" means the lanes most directly tied to recognizable art history should collectively be common, not occasional.

```json
{
  "impressionist_light_field": 11,
  "fragmented_modernism": 10,
  "expressive_color": 9,
  "geometric_avant_garde": 8,
  "conceptual_dada_surreal": 8,
  "east_asian_ink": 8,
  "renaissance_baroque_allegory": 7,
  "medieval_icon_glass": 6,
  "ukiyo_e_flatworld": 6,
  "print_process": 6,
  "pop_repetition_media": 5,
  "minimalist_reduction": 5,
  "gongbi_miniature": 4,
  "social_mural_realism": 3,
  "material_arte_povera": 2,
  "textile_tapestry_map": 1,
  "optical_digital_signal": 1,
  "real_object_still_life": 0
}
```

Rules:

- `real_object_still_life` is not part of ordinary random style selection. Use it only when the poster concept centers on an exact film prop/object or the user asks for real-object still life.
- If recent outputs lacked classic art-history styles, use `corrective` mode and draw only from: `impressionist_light_field`, `fragmented_modernism`, `expressive_color`, `geometric_avant_garde`, `conceptual_dada_surreal`, `east_asian_ink`, `ukiyo_e_flatworld`, `medieval_icon_glass`, `renaissance_baroque_allegory`, `print_process`, or `pop_repetition_media`.
- Do not let "film suitability" collapse the draw back to normal polished illustration. If the lane feels surprising, write a `counterpoint_bridge`.
- The prompt must name the selected lane and include a visible mechanism from it, such as broken color, faceting, fauvist contour, ink wash, stained glass tesserae, fresco grouping, woodcut cuts, halftone repetition, or hard-edge geometry.

Choose one lane:

1. **geometric_avant_garde**: constructivism, suprematism, Bauhaus, De Stijl, Swiss grid, hard diagonals, primary geometry.
2. **fragmented_modernism**: analytic cubism, synthetic cubism, Picasso/Braque-style fractured planes, futurism, fractured viewpoint, faceted faces/objects, analytic collage.
3. **expressive_color**: fauvism, expressionism, neo-expressionism, unnatural emotional color, raw contour.
4. **pop_repetition_media**: pop art, screen print, halftone, repeated faces/objects, commercial color, image-culture critique.
5. **conceptual_dada_surreal**: Dada, surrealism, conceptual displacement, impossible objects, dry absurdity.
6. **optical_digital_signal**: op art, kinetic grids, CRT, VHS, datamosh, cybernetic diagrams, signal noise.
7. **material_arte_povera**: ash, cloth, metal, paper, rope, dust, found-material assemblage, ritual object.
8. **east_asian_ink**: Chinese ink wash, literati painting, splashed ink, Zen ink, nihonga, empty space, brush rhythm, mist and paper grain.
9. **gongbi_miniature**: Chinese gongbi, Persian/Indian miniature, precise line, mineral color, dense symbolic detail.
10. **ukiyo_e_flatworld**: ukiyo-e, flat planes, patterned fabric, seasonal framing, theatrical contour.
11. **medieval_icon_glass**: illuminated manuscript, Byzantine icon, Gothic stained glass, gold ground, sacred flat space.
12. **renaissance_baroque_allegory**: fresco, classical allegory, Baroque light, staged human drama, symbolic anatomy.
13. **social_mural_realism**: Russian realist gravity, Mexican muralism, Soviet poster force, public historical drama.
14. **print_process**: woodcut, linocut, etching, lithograph, risograph, screen print, tactile ink limits.
15. **textile_tapestry_map**: tapestry, embroidery, woven grids, map/diagram as image structure.
16. **impressionist_light_field**: impressionism, post-impressionism, pointillism, broken color, plein-air light logic, atmospheric brushwork.
17. **minimalist_reduction**: minimalism, hard-edge painting, sparse geometry, one or two charged elements, disciplined emptiness, quiet scale tension.
18. **real_object_still_life**: realistic/real-world object still life, exact film prop materiality, product-photography clarity, tactile surfaces, controlled light, no visible faces.

## Style Variant Pool

After drawing a lane, draw or choose one specific variant from that lane. Put the variant in the prompt as a structural instruction.

- `geometric_avant_garde`: Russian constructivist diagonals; suprematist floating geometry; Bauhaus poster grid; De Stijl primary rectangles; Swiss grid with asymmetrical type blocks.
- `fragmented_modernism`: analytic cubist portrait/object fracture; synthetic cubist collage; Picasso/Braque-like faceted planes without copying a painting; futurist motion decomposition; fractured surveillance geometry.
- `expressive_color`: fauvist non-natural color; German expressionist contour; neo-expressionist scraped figure; Symbolist dream color; post-impressionist emotional contour.
- `pop_repetition_media`: Warholian repetition described as silkscreen repetition/halftone commercial color; Lichtenstein-like comic dots without copying panels; consumer packaging color grid; media-image degradation.
- `conceptual_dada_surreal`: Magritte-like conceptual displacement described as impossible object logic; Dada photomontage; absurd scale; dry museum-installation metaphor; symbolic object substitution.
- `optical_digital_signal`: op-art vibration; CRT scanlines; VHS ghosting; datamosh block field; cybernetic diagram.
- `material_arte_povera`: ash drawing; cloth/rope assemblage; rusted metal and paper; earth pigment; found-object altar.
- `east_asian_ink`: Chinese ink wash landscape; literati blankness and brush rhythm; splashed-ink abstraction; Zen ink economy; nihonga mineral haze.
- `gongbi_miniature`: Chinese gongbi line and mineral color; Persian miniature architecture; Indian miniature color fields; dense symbolic border; jewel-like flat space.
- `ukiyo_e_flatworld`: ukiyo-e theatrical portrait; landscape cartouche; patterned fabric planes; seasonal weather; flattened waves/clouds.
- `medieval_icon_glass`: illuminated manuscript page; Byzantine icon flat gold; Gothic stained glass; marginalia symbols; sacred flat space.
- `renaissance_baroque_allegory`: Renaissance fresco grouping; neoclassical allegory; Baroque chiaroscuro; Romantic landscape drama; classical anatomy translated into poster symbols.
- `social_mural_realism`: Repin-school moral gravity; Mexican mural massing; Soviet poster force; public-history frieze; earthy social realism without photography.
- `print_process`: woodcut; linocut; etching; lithograph; risograph; screen print; high-contrast ink limits.
- `textile_tapestry_map`: medieval battle tapestry; embroidery grid; woven map; textile diagram; thread-like contour system.
- `impressionist_light_field`: Monet-like broken light without direct imitation; Renoir-like warm figure light without copying; Degas-like cropped movement; Seurat-like pointillist color particles; Van Gogh-like directional strokes without copying a specific painting.
- `minimalist_reduction`: Agnes Martin-like quiet grid described as pale hand-drawn intervals; Ellsworth Kelly-like hard color shape; Donald Judd-like serial blocks translated to flat poster; Japanese ma-like emptiness; one-object minimal poster.
- `real_object_still_life`: exact film prop still life; forensic object study; museum-object photograph; product-photography lighting; hand/foot/body-part interaction without faces; realistic material detail for key props such as Xu Haofeng's The Final Master's wing chun butterfly swords / 八斩刀, No Country for Old Men's captive bolt pistol/air gun, The Devil Wears Prada's high heel shoes, Harry Potter's wand, a ring, key, cigarette, handbag, cassette, mask, or vehicle detail.

## Real Object Still Life Rules

Use `real_object_still_life` when the poster's strongest anchor is a real object, weapon, costume piece, vehicle part, document, instrument, or artifact from the film.

- It is realistic/real-world in object rendering, but still a designed poster, not an ordinary product ad.
- It should usually depict key props, not faces.
- People may appear only as body fragments: hands, feet, shoulder, sleeve, glove, shoe, torso crop, shadow, or silhouette edge.
- Do not show a recognizable face in this lane.
- Build a prop identity lock first. The object must match the film-specific form, material, scale, and use.
- Good uses: 八斩刀 in `The Final Master`, captive bolt pistol/air gun in `No Country for Old Men`, high heels in `The Devil Wears Prada`, wand in `Harry Potter`, a suitcase, ring, chess piece, camera, cassette, or car detail.
- Avoid generic substitutes, fantasy redesigns, and decorative prop piles.

## Randomization Discipline

- The weighted draw is not a suggestion. Keep it through prompt writing.
- If the draw feels mismatched, write a `counterpoint_bridge` rather than replacing the style.
- The prompt must include the exact `style_lane` and `style_variant`.
- The prompt must include one visible mechanism from the style: brushstroke, faceting, pointillist dots, ink wash, hard-edge reduction, mosaic tesserae, woodcut cuts, textile threads, etc.
- A generated image fails style QA if the chosen style is only named but not visibly present.
- Do not let the model collapse to polished contemporary illustration. The style must affect composition, texture, color, and abstraction.

The selected lane must appear in the manifest and in the prompt as structure, not decoration:

```text
Style lane: [style_lane]. Build the image through [lane-specific structure],
not conventional illustration. Use [abstraction mechanism] and [material
constraint] so the poster is visually distinct from prior generations.
```

## Anti-Collapse Rules

If prior outputs look stylistically similar:

- remove generic style terms such as `painterly`, `cinematic`, `beautiful`, `high aesthetic`, `poster art`;
- begin the image prompt with the chosen `style_lane`;
- include one forbidden line: `avoid conventional AI illustration and generic art-poster look`;
- force a different composition system: grid, icon, collage, tapestry, signal field, miniature, stained glass, map, diagram, or assemblage;
- use a material/process constraint that visibly changes the image surface.

## Counterpoint Strategy

Sometimes the most interesting poster comes from a deliberate mismatch between film genre and art language. Use this only when the contrast reveals the film rather than becoming a gimmick.

Good counterpoints:

- cyberpunk or science fiction rendered as Chinese ink, ukiyo-e, illuminated manuscript, or Renaissance allegory;
- superhero spectacle rendered as constructivist geometry, pop art systems, fresco, or medieval battle tapestry;
- social realism rendered as gongbi stillness, arte povera material texture, or conceptual installation;
- horror rendered as minimal abstraction, stained glass, or clinical Bauhaus grid;
- romantic melodrama rendered as cubist split perspective, color-field atmosphere, or ukiyo-e seasonal framing.

Before using a counterpoint, state the bridge:

```text
Counterpoint bridge: although [film] is [genre/period], [chosen art language]
reveals [theme/formal quality] through [visual mechanism].
```

Avoid counterpoint when it erases the film's identity, turns culture into decoration, or makes the poster look like a random style demo.

## Style Escalation

If the output still looks like ordinary illustration, do not add more adjectives. Change the structural art language.

Escalation levels:

1. **Poster design**: graphic composition, strong symbol, controlled palette.
2. **Art movement**: cubist, constructivist, fauvist, surrealist, pop, suprematist, ukiyo-e, ink, medieval, etc.
3. **Abstraction mechanism**: fragmentation, repetition, flattening, ritual icon, diagram, material assemblage, color-field pressure, optical vibration, symbolic substitution.
4. **Material constraint**: screen print, woodcut, stained glass, fresco, torn collage, mineral pigment, photocopy, CRT signal, ash/cloth/metal.
5. **Semantic bridge**: explain why this mechanism reveals the film.

For films like `Lust, Caution`, do not settle for elegant period-drama illustration. Possible stronger directions:

- **Mahjong cubism**: fragmented faces, hands, cheongsam fabric, tiles, and surveillance geometry as faceted planes.
- **Gongbi espionage miniature**: precise line, silk texture, restrained erotic tension, hidden blades of negative shape.
- **Warholian repetition under occupation**: repeated identity masks, lipstick/red seals, commercial color turned anxious.
- **Constructivist desire trap**: diagonals, red/black geometry, bodies as political vectors, coded typography blocks.
- **Chinese ink-noir counterpoint**: bodies dissolve into ink stains, a ring or cigarette ember as the only saturated sign.

These are examples of structural transformations, not fixed presets.

## Distillation Prompt Pattern

```text
Style lane: [style_lane]. Create an original key visual inspired by [film].
Do not depict a literal scene or photorealistic live-action frame. Translate
the film's central emotional pressure into a symbolic poster device:
[metaphor]. Use [lane-specific structure], [material/process], [palette],
[composition system], and [semiotic layering / counterpoint bridge] so the
image has signifier and signified depth rather than normal illustration.
Treat the composition as a finished artwork, not a generic art-poster image
or an image with an obvious blank title area.
```

## Anti-Realism Controls

Add these when outputs are too literal:

- "not a film still"
- "not photorealistic"
- "not live-action"
- "not a realistic actor portrait"
- "graphic poster composition"
- "symbolic visual metaphor"
- "designed key art"
- "flat shapes and controlled texture"
- "editorial negative space"
- "no literal scene reenactment"

Do not over-stack style names. Choose one dominant grammar and one supporting texture.

If outputs are too normal or illustration-like, choose a bolder art language from the matrix and include:

- one explicit abstraction mechanism;
- one material/process constraint;
- one semiotic layer;
- one reason this style reveals the film.

Negative controls for style escalation:

- "not conventional illustration"
- "not polished concept art"
- "not a tasteful normal film poster"
- "not generic editorial illustration"
- "avoid safe painterly realism"
- "avoid decorative blank space"
