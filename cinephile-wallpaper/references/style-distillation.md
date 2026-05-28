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

Choose one primary art language and one secondary device. Avoid safe illustration as the default. When a prior output stayed conventional, escalate by choosing from the stronger sets below and writing the escalation directly into the prompt.

### Modern And Contemporary

- abstraction;
- abstract expressionism;
- color-field painting;
- constructivism;
- suprematism;
- cubism;
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

Choose a fresh lane for the current request based on the film, the user's style preference, and the need to avoid conventional illustration. Do not inspect prior generated outputs as a cache, and do not return an old result for a repeated film request.

Choose one lane:

1. **geometric_avant_garde**: constructivism, suprematism, Bauhaus, De Stijl, Swiss grid, hard diagonals, primary geometry.
2. **fragmented_modernism**: cubism, futurism, fractured viewpoint, faceted faces/objects, analytic collage.
3. **expressive_color**: fauvism, expressionism, neo-expressionism, unnatural emotional color, raw contour.
4. **pop_repetition_media**: pop art, screen print, halftone, repeated faces/objects, commercial color, image-culture critique.
5. **conceptual_dada_surreal**: Dada, surrealism, conceptual displacement, impossible objects, dry absurdity.
6. **optical_digital_signal**: op art, kinetic grids, CRT, VHS, datamosh, cybernetic diagrams, signal noise.
7. **material_arte_povera**: ash, cloth, metal, paper, rope, dust, found-material assemblage, ritual object.
8. **east_asian_ink**: Chinese ink, literati painting, nihonga, empty space, brush rhythm, mist and paper grain.
9. **gongbi_miniature**: Chinese gongbi, Persian/Indian miniature, precise line, mineral color, dense symbolic detail.
10. **ukiyo_e_flatworld**: ukiyo-e, flat planes, patterned fabric, seasonal framing, theatrical contour.
11. **medieval_icon_glass**: illuminated manuscript, Byzantine icon, Gothic stained glass, gold ground, sacred flat space.
12. **renaissance_baroque_allegory**: fresco, classical allegory, Baroque light, staged human drama, symbolic anatomy.
13. **social_mural_realism**: Russian realist gravity, Mexican muralism, Soviet poster force, public historical drama.
14. **print_process**: woodcut, linocut, etching, lithograph, risograph, screen print, tactile ink limits.
15. **textile_tapestry_map**: tapestry, embroidery, woven grids, map/diagram as image structure.

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
