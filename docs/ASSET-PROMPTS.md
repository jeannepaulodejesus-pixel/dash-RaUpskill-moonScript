# Asset prompts (Night Glass, 2026-10-02)

Every photograph in `assets/img/` was generated with the Codex CLI's built-in image generation (`codex exec`, `image_generation` feature), one session per image, with the prompts below sent verbatim. Reference images passed with `-i` are listed per asset. Raw outputs (1672 × 941, the mug 1312 × 1199 RGBA) were exported to 2400 px wide with Lanczos scaling, WebP quality 80 and JPEG q3; the mug to 900 px WebP with alpha. Grade adjustments at export: `dawn` saturation 0.8, `far-dawn` 0.88, `desk-dawn` 0.9.

The page uses only the WebP files. The JPEGs are kept for parity with the earlier asset set.

Order matters: `night` came first and is the palette reference for `desk` and `dawn`; `far` and `desk` are the camera references for their dawn versions.

## night

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as night.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Image specification:
Asset: full-bleed website background plate that will sit behind frosted-glass panels, so it must read beautifully when heavily blurred.
Style preamble (verbatim): cinematic night photograph, 35mm film, single cool moonlight key, true blacks, deep navy shadows, fine film grain, photographic realism, muted desaturated grade.
Scene: the view through a tall office window late at night, deliberately out of focus. A soft moon glow in the upper right third. Below it, a distant city skyline dissolved into large, round, soft bokeh lights: mostly cool white and pale blue, with a few small warm amber points low in the frame. Gentle navy-to-black gradient sky with faint thin cloud. No window frame, no mullions, no interior objects. Large calm areas of deep navy in the left half for text to sit over.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no text, no logos, no watermark, no people, no glow halos drawn as rings, no lens-flare streaks, no purple or magenta cast.
```

## far

Input: the v1.0.0 `far.jpg` (composition only).

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as far.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic night photograph, 35mm film, single cool moonlight key, true blacks, deep navy shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the far background plane of a layered website hero. Other layers (a desk, a paper card, a mug, and headline text) are composited on top in code.
Input image 1 is a composition reference only (camera height and a window with a moon upper right). Make it cleaner and more architectural.
Scene: inside a dark, quiet office after hours, looking at a wall of floor-to-ceiling glass panes with slim black steel mullions (three tall panes visible). Outside: deep navy night sky, a bright full moon in the upper right pane, a few thin silver clouds lit from behind. Far below, a distant city skyline with small, sharp, cool white lights and a few warm amber windows along the lower fifth of the frame. Faint cool reflections on the glass. The left third of the frame is a dark interior wall in deep shadow, nearly black, so white headline text placed there stays readable. The bottom 25 percent of the frame is a plain dark interior floor area that will be hidden behind a desk layer. No window sill objects, no books, no handles, no plants, no furniture.
Framing: wide landscape 16:9, eye level, straight verticals, full bleed, no letterbox bars.
Constraints: no text, no logos, no watermark, no people, no lens flare, no purple or magenta cast, no oversaturated moon, the moon is crisp and realistic with subtle surface detail.
```

## desk

Inputs: the previous `desk.jpg` (camera), `night.png` (palette).

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as desk.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic night photograph, 35mm film, single cool moonlight key, true blacks, deep navy shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the desk foreground plane of a layered website hero. A paper procedure card and a mug are composited on its surface later in code, and a far window layer sits behind it.
Input image 1 is the camera angle and desk silhouette reference: keep that oblique close view from above, with the front edge running diagonally from lower left toward middle right and the broad flat tabletop filling most of the frame. Input image 2 is the lighting and palette reference only (deep navy night, cool moonlight); do not include its city or moon.
Subject: a finely crafted dark walnut desk with restrained, authentic fine grain at believable scale, satin finish, precise straight edges. Soft cool moonlight from the upper right back grazes the surface and catches the front edge as a thin highlight. The far part of the tabletop falls off into deep navy darkness at the top of the frame (the top 25 percent is almost black, so it blends into the layer behind). Large clear empty surface in the centre right.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no objects on the desk, no papers, no text, no logos, no watermark, no carved or wavy grain, no concentric swirls, no repeated ridges, no glossy CGI look, no warm lamp light.
```

## mug

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as mug.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic night photograph, 35mm film, single cool moonlight key, true blacks, deep navy shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: an isolated foreground cutout for a layered website hero. It MUST be a PNG with a genuinely transparent background (alpha channel), not a checkerboard pattern and not a white or black backdrop. If the tool supports a transparent background option, use it. Verify the saved PNG has an alpha channel (for example with Python PIL) and report whether it does.
Subject: a single matte charcoal ceramic coffee mug, plain with no print, three-quarter view from slightly above, handle to the left, a thin rim of cool moonlight from the upper right along its edge, the rest in deep shadow. Complete object, nothing cropped, centred with a small margin.
Constraints: no text, no logos, no saucer, no steam, no table surface, no shadow on a ground plane.
```

## moon

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as moon.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic night photograph, 35mm film, single cool moonlight key, true blacks, deep navy shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: background for a quiet "break" section of a website. Text sits in the upper left on top of it.
Scene: a large full moon rising just above a dark, distant horizon of low hills and a faint thin layer of cloud. The moon sits in the lower centre-right of the frame, about one fifth of the frame height, crisp and realistic with subtle grey surface detail and a gentle, natural atmospheric glow. Above it, a vast calm gradient sky from deep navy to near-black, with a handful of faint stars. The upper half and the left side are calm, dark and empty.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no text, no logos, no watermark, no people, no buildings, no lens flare, no purple or magenta cast, no orange moon.
```

## dawn

Input: `night.png`.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as dawn.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic first-light photograph, 35mm film, single soft dawn key, true blacks, deep slate shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: full-bleed website background plate that sits behind frosted-glass panels at the end of the page, so it must read beautifully when heavily blurred.
Input image 1 is the same view at night. Recreate the same out-of-focus city view and camera at first light, just before sunrise: the moon has set; the sky is a calm gradient from deep slate blue at the top to a muted pale peach and dusty rose glow low along the horizon on the right. The distant skyline is still dissolved into soft round bokeh, with fewer lights on and most of them cool white. Large calm slate-blue areas in the left half for text to sit over. Keep the grade muted and desaturated, not orange, not vivid.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no window frame, no interior objects, no text, no logos, no watermark, no people, no sun disc, no lens flare, no purple or magenta cast.
```

## far-dawn

Input: `far.png`.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as far-dawn.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic first-light photograph, 35mm film, single soft dawn key, true blacks, deep slate shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the far background plane of the closing scene of a website. It must match Input image 1 exactly in camera, framing, architecture and composition: the same dark office interior, the same three tall glass panes with slim black steel mullions, the same dark left wall, the same skyline position and the same floor area in the bottom quarter.
Change only the time: first light, just before sunrise. The moon has set. The sky is a calm gradient from deep slate blue at the top to a muted pale peach glow low on the horizon behind the skyline, slightly brighter on the right. Most city lights are off; a few cool white windows remain. Soft dawn light reflects faintly on the glass and on the floor. The left third remains a dark wall in shadow so white text stays readable there.
Framing: wide landscape 16:9, eye level, straight verticals, full bleed, no letterbox bars.
Constraints: no text, no logos, no watermark, no people, no sun disc, no lens flare, no purple or magenta cast, not vivid orange.
```

## desk-dawn

Input: `desk.png`.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as desk-dawn.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic first-light photograph, 35mm film, single soft dawn key, true blacks, deep slate shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the desk foreground plane of the closing scene of a website. It must match Input image 1 exactly in camera angle, framing, desk shape, edge position and wood: the same oblique close view of the same dark walnut desk, the same diagonal front edge, the same restrained fine grain, the same dark falloff in the top quarter.
Change only the light: soft first light of dawn from the upper right back, a little warmer and brighter than the night version, a gentle pale highlight along the front edge, still muted and desaturated, deep slate shadows.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no objects on the desk, no papers, no text, no logos, no watermark, no carved or wavy grain, no concentric swirls, no repeated ridges, no glossy CGI look.
```


## Hero depth planes (2026-10-02, not generated)

`hero-sky.webp`, `hero-room.webp` and `hero-moon.webp` are cut from `far.webp` by `python tools/cut-hero.py`. There is no prompt: the window is geometric, so the panes, mullions, sill and moon are measured in the 2400 x 1350 source (constants at the top of the script). The sky has its mullions filled from the city on either side and the moon inpainted; its margins are mirrored and feathered so they dissolve into the world plate. Rerun the script after any change to `far.webp`, and re-measure the headline placement in `src/styles.css` (`.hero__head`).

## Transition clouds (2026-10-02, Codex imagegen)

`cloud-far` and `cloud-near` were generated on pure black with `codex exec --enable image_generation`, one session each, no reference image, then keyed to alpha by `python tools/key-clouds.py` (white with luminance alpha, edges feathered; see the script). Raw outputs are 1672 x 941 and are kept in `lab/gen/cloud-*/` (gitignored). Rerun the script after regenerating.

### cloud-far

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as cloud-far.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic night photograph, 35mm film, single cool moonlight key, true blacks, deep navy shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: a translucent atmosphere layer for a website. It is composited in code with a screen blend over a dark night page, so everything that is not cloud must be pure flat black.
Scene: a wide, soft bank of thin night cloud and mist seen from inside it, lit from the upper right by moonlight. Silvery grey wisps with soft feathered edges, densest in a broad horizontal band through the middle of the frame, thinning to pure black toward the top and bottom edges and fading out toward the left and right edges. Low contrast, delicate, layered, no hard shapes.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: pure black background, no sky gradient, no stars, no moon, no city, no horizon, no ground, no text, no logos, no watermark, no blue, purple or magenta tint (at most a very faint cool grey).
```

### cloud-near

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as cloud-near.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic night photograph, 35mm film, single cool moonlight key, true blacks, deep navy shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the near atmosphere layer for a website transition. It is composited in code with a screen blend over a dark night page, so everything that is not cloud must be pure flat black.
Scene: two or three large, soft masses of night cloud passing very close to the camera, slightly out of focus, lit from the upper right by moonlight: bright silver rims along their upper edges, deep grey bodies, wispy trailing edges. The masses sit in the lower half and along the left and right sides of the frame, with a clear dark gap through the upper middle.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: pure black background, no sky gradient, no stars, no moon, no city, no horizon, no ground, no text, no logos, no watermark, no blue, purple or magenta tint (at most a very faint cool grey).
```


# Asset prompts: The Press Run (2026-10-02)

The moon set above is superseded. The print-shop photography was generated with the Codex CLI's built-in image generation (`codex exec --enable image_generation`), one session per image, at the user's request ("you may generate images again in codex cli"). Each prompt below was sent verbatim. Raw outputs are 1672 x 941 plates and 1536 x 1024 or 1254 x 1254 RGBA cutouts (alpha verified). They are kept in `lab/gen/press/<name>/` (gitignored) and exported with `python tools/export-assets.py`: plates to 2400 px WebP q80; cutouts cropped to their alpha, WebP with alpha (press 1400 px wide, brayer 900, roller 900 tall after a 90 degree clockwise turn). There are no JPEG twins; the page uses only WebP.

The first eight were generated with no reference image. The three daylight plates take the matching night plate as Input image 1.

## hero-shop

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as hero-shop.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a quiet letterpress print shop before the morning run, single warm tungsten work-lamp key with a faint cool window fill, true blacks, deep umber shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the far background plane of a layered website hero. Other layers are composited on top in code: a cylinder proof press cutout standing in the middle distance on the right, a dark stone worktable across the bottom of the frame, a paper proof, an ink roller, and large headline text.
Scene: inside a small letterpress print shop before dawn, eye level, looking straight at the back wall. Floor-to-ceiling wooden type cabinets with rows of shallow drawers and small brass pulls fill the right two thirds of the back wall. On the far right, a tall factory window with small steel-framed panes lets in faint cool blue pre-dawn light. A single warm work lamp with a metal shade hangs on the right, casting a soft amber pool down the cabinets. The upper left of the frame is a calm, plain, dark plaster wall in deep umber shadow with very little detail, so a large white headline can sit there. The bottom 30 percent is dark floor in shadow (it will be covered by another layer).
Framing: wide landscape 16:9, eye level, straight verticals, full bleed, no letterbox bars.
Constraints: no printing press in the frame (it is a separate layer), no table or objects in the foreground, no readable text, no letters or words anywhere (type and printed matter, if visible, must be too small or too blurred to read), no logos, no brand plates, no watermark, no people, no lens flare, no orange cast, no purple or magenta cast.
```

## press

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as press.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a quiet letterpress print shop before the morning run, single warm tungsten work-lamp key with a faint cool window fill, true blacks, deep umber shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: an isolated mid-ground cutout for a layered website hero. It MUST be a PNG with a genuinely transparent background (alpha channel), not a checkerboard pattern and not a white or black backdrop. If the tool supports a transparent background option, use it. Verify the saved PNG has an alpha channel (for example with Python PIL) and report whether it does.
Subject: a vintage cast-iron cylinder proof press of the kind used in small letterpress shops, three-quarter view from slightly above eye level, the long bed running toward the left, dark green-black enamel with worn edges showing bare metal, a heavy polished steel cylinder carriage and a crank wheel, the bed empty. Lit by a warm work lamp from the upper right: a thin warm rim light along its upper edges and the cylinder, the rest in deep shadow. Complete object including its legs and base, nothing cropped, centred with a small margin.
Constraints: no readable text, no letters or words anywhere (type and printed matter, if visible, must be too small or too blurred to read), no logos, no brand plates, no watermark, no people, no floor, no shadow on a ground plane, no background.
```

## stone

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as stone.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a quiet letterpress print shop before the morning run, single warm tungsten work-lamp key with a faint cool window fill, true blacks, deep umber shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the foreground plane of a layered website hero. A paper proof sheet and an ink roller are composited on its surface later in code, and a print shop layer sits behind it.
Subject: an imposing stone, the heavy flat worktable of a letterpress shop: a dark grey-black slate top with a thin steel edge band, seen in an oblique close view from above, with the front edge running diagonally from lower left toward middle right and the broad flat surface filling most of the frame. On the left third of the surface sits a locked chase: a rectangular steel frame holding a block of hand-set metal type, wooden furniture and quoins; the type faces catch the warm lamp light with a faint sheen of black ink (letters far too small and too soft to read). Large clear empty slate in the centre right. Warm lamp light from the upper right grazes the surface and catches the front edge as a thin highlight. The far part of the surface falls off into darkness at the top of the frame (the top 25 percent is almost black, so it blends into the layer behind).
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no paper on the stone, no tools on the right half, no readable text, no letters or words anywhere (type and printed matter, if visible, must be too small or too blurred to read), no logos, no brand plates, no watermark, no people, no glossy CGI look, no carved patterns.
```

## brayer

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as brayer.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a quiet letterpress print shop before the morning run, single warm tungsten work-lamp key with a faint cool window fill, true blacks, deep umber shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: an isolated foreground cutout for a layered website hero; it will be shown large and slightly blurred in a front corner. It MUST be a PNG with a genuinely transparent background (alpha channel), not a checkerboard pattern and not a white or black backdrop. If the tool supports a transparent background option, use it. Verify the saved PNG has an alpha channel (for example with Python PIL) and report whether it does.
Subject: a single hand ink brayer: a black rubber roller on a simple steel frame with a turned dark wooden handle, the roller coated in a thin, even, glossy layer of black ink. Three-quarter view from slightly above, the handle pointing to the left. A thin rim of warm lamp light from the upper right along its edges, the rest in deep shadow. Complete object, nothing cropped, centred with a small margin.
Constraints: no readable text, no letters or words anywhere (type and printed matter, if visible, must be too small or too blurred to read), no logos, no brand plates, no watermark, no people, no table surface, no ink slab, no shadow on a ground plane.
```

## shop

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as shop.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a quiet letterpress print shop before the morning run, single warm tungsten work-lamp key with a faint cool window fill, true blacks, deep umber shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: full-bleed website background plate that sits behind smoked translucent panels for the whole page, so it must read beautifully when heavily blurred.
Scene: the interior of a small working letterpress print shop, deliberately out of focus, seen from the back of the room. Tall wooden type cabinets with many shallow drawers and small brass pulls along the left and back walls, a cast-iron platen press and a cylinder proof press as dark soft shapes in the middle distance, a single warm work lamp hanging low on the right throwing a soft amber pool, faint cool daylight from a high window on the far right. Soft round bokeh from the brass pulls and the lamp. Large calm areas of deep umber and near-black across the left half for text to sit over.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no readable text, no letters or words anywhere (type and printed matter, if visible, must be too small or too blurred to read), no logos, no brand plates, no watermark, no people, no lens flare, no orange cast, no purple or magenta cast.
```

## type-far

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as type-far.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a quiet letterpress print shop before the morning run, single warm tungsten work-lamp key with a faint cool window fill, true blacks, deep umber shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: a dim background plate for a chapter title section of a website. A very large word is set over it in code, so it must stay dark, quiet and low in contrast.
Scene: a macro photograph looking down at an angle over a forme of hand-set metal type locked in a chase: long rows of type faces and spacing, a thin sheen of black ink on the faces, warm lamp light grazing from the right so the type edges glint softly. Extremely shallow depth of field: only a narrow diagonal band in the lower right is sharp; everything else falls into soft dark blur. The upper and left areas are calm, dark and nearly featureless.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no readable text, no letters or words anywhere (type and printed matter, if visible, must be too small or too blurred to read), no logos, no brand plates, no watermark, no people, no hands, no paper, no lens flare, no orange cast.
```

## roller

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as roller.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a quiet letterpress print shop before the morning run, single warm tungsten work-lamp key with a faint cool window fill, true blacks, deep umber shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: an isolated cutout for a website transition, in which it rolls across a large word. It MUST be a PNG with a genuinely transparent background (alpha channel), not a checkerboard pattern and not a white or black backdrop. If the tool supports a transparent background option, use it. Verify the saved PNG has an alpha channel (for example with Python PIL) and report whether it does.
Subject: a single hand ink brayer seen from directly above (top-down, flat orthographic view): a wide black rubber roller whose axis runs horizontally across the image, on a simple steel frame, with a turned dark wooden handle pointing straight down toward the bottom edge of the image. The roller is coated in a thin, even, glossy layer of black ink with a soft warm specular highlight running along its length. Complete object, nothing cropped, centred with a small margin.
Constraints: no readable text, no letters or words anywhere (type and printed matter, if visible, must be too small or too blurred to read), no logos, no brand plates, no watermark, no people, no table surface, no ink slab, no shadow on a ground plane, no perspective tilt.
```

## rest

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as rest.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a quiet letterpress print shop before the morning run, single warm tungsten work-lamp key with a faint cool window fill, true blacks, deep umber shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: background for a quiet "break" section of a website. Text sits over the upper left and left side.
Scene: the print shop at rest between runs. A cylinder proof press in the lower right of the frame, its bed holding a locked forme of type, the carriage parked at the end of the bed, a hand brayer resting beside it. One low warm work lamp hangs above it and makes the only pool of light; everything else falls into deep, calm darkness. The upper half and the left side of the frame are dark and empty. Still and quiet.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no readable text, no letters or words anywhere (type and printed matter, if visible, must be too small or too blurred to read), no logos, no brand plates, no watermark, no people, no lens flare, no orange cast, no purple or magenta cast.
```

## shop-day

Input: `shop.png`.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as shop-day.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a quiet letterpress print shop on the morning of the run, soft overcast daylight key from tall windows, true blacks, deep umber shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: full-bleed website background plate for the end of the page, behind smoked translucent panels, so it must read beautifully when heavily blurred.
Input image 1 is the same print shop before dawn. Recreate the same out-of-focus view and camera on the morning of the run: the work lamp is off, soft overcast daylight now comes from the high window on the right and fills the room gently. The type cabinets and presses stay soft dark shapes, a little more visible. Large calm, dark umber areas remain across the left half for text. Keep the grade muted and desaturated.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no readable text, no letters or words anywhere (type and printed matter, if visible, must be too small or too blurred to read), no logos, no brand plates, no watermark, no people, no sun rays, no lens flare, no orange cast, no purple or magenta cast.
```

## hero-shop-day

Input: `hero-shop.png`.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as hero-shop-day.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a quiet letterpress print shop on the morning of the run, soft overcast daylight key from tall windows, true blacks, deep umber shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the far background plane of the closing scene of a website. It must match Input image 1 exactly in camera, framing and architecture: the same back wall of type cabinets, the same tall steel-framed window on the right, the same plain dark plaster wall in the upper left, the same lamp, the same dark floor in the bottom 30 percent.
Change only the time: the morning of the run. The lamp is off. Soft overcast daylight comes through the window on the right and spreads across the cabinets; the room is gently lit but still muted. The upper left wall stays dark enough for white text.
Framing: wide landscape 16:9, eye level, straight verticals, full bleed, no letterbox bars.
Constraints: no readable text, no letters or words anywhere (type and printed matter, if visible, must be too small or too blurred to read), no logos, no brand plates, no watermark, no people, no sun disc, no sun rays, no lens flare, no orange cast, no purple or magenta cast.
```

## stone-day

Input: `stone.png`.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as stone-day.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a quiet letterpress print shop on the morning of the run, soft overcast daylight key from tall windows, true blacks, deep umber shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the foreground plane of the closing scene of a website. It must match Input image 1 exactly in camera angle, framing, stone shape, edge position and the locked chase of type on the left third: the same oblique close view, the same diagonal front edge, the same dark falloff in the top quarter.
Change only the light and one detail: soft overcast morning daylight from the upper right, a little brighter and cooler than the lamp-lit version, a gentle pale highlight along the front edge. On the empty right half of the slate lies a short, neat stack of freshly printed sheets, face down, plain backs showing.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no readable text, no letters or words anywhere (type and printed matter, if visible, must be too small or too blurred to read), no logos, no brand plates, no watermark, no people, no glossy CGI look, no carved patterns.
```

# Asset prompts: The Preset (2026-11-11)

The print-shop set above is superseded. The OneTap photography was generated with the Codex CLI's built-in image generation (`codex exec --enable image_generation -s workspace-write`), one session per image, at the user's request (they chose the Codex route for this set). Each prompt below was sent verbatim on stdin; the runner is `lab/gen/preset/run.sh` (gitignored, local). Raw outputs are 1672 x 941 plates and RGBA cutouts (alpha verified: camera 1024 x 1536, phone 1672 x 941). They are kept in `lab/gen/preset/<name>/` and exported with `python tools/export-assets.py`: plates to 2400 px WebP q80; cutouts cropped to their alpha, alpha at 240 or above made opaque, WebP with alpha (camera 760 px wide, phone 900).

`shot` is exported twice and never used as is: `shot-raw.webp` is the photograph flattened like an unedited RAW file (`RAW` in the tool), `shot-edit.webp` is the same photograph with `PRESET` applied (S-curve, teal shadows, amber highlights, a little saturation). The page crossfades between them, so the edit it shows is a real preset.

## room

Input: the Press Run `hero-shop.webp` (composition only: camera height, plain wall upper left, lamp and window right, floor line).

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as room.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a creator's small home editing desk late at night, single warm desk-lamp key with a faint cool window fill, true blacks, deep graphite shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the far background plane of a layered website hero. Other layers are composited on top in code: a camera on a tripod standing in the middle distance on the right, a dark desk surface across the bottom of the frame, a paper checklist, a phone, and large headline text.
Input image 1 is a composition reference only: keep its camera height, its plain dark wall in the upper left, its lamp on the right, its tall window at the far right and its dark floor in the bottom 30 percent. Replace everything else; it is a different room.
Scene: a small apartment room used as a photo-editing studio, late at night, eye level, looking straight at the back wall. On the right two thirds of the wall, a loose, uneven grid of small unframed photo prints held up with strips of tape and a few bulldog clips: city streets, portraits in silhouette, landscapes, all small and slightly soft, none with text. A single warm desk lamp with an angled metal arm glows on the right and casts a soft amber pool across the prints. At the far right, a tall window with faint rain on the glass and soft cool blue city bokeh outside. The upper left of the frame is a calm, plain, dark painted wall in deep graphite shadow with very little detail, so a large white headline can sit there. The bottom 30 percent is dark floor in shadow (it will be covered by another layer).
Framing: wide landscape 16:9, eye level, straight verticals, full bleed, no letterbox bars.
Constraints: no readable text, no letters, numbers or words anywhere, no screens showing an interface or app (any screen is off or dark), no logos, no brand marks, no watermark, no people, no lens flare, no orange cast, no purple or magenta cast. No camera or tripod in the frame (it is a separate layer), no desk or objects in the foreground, no monitor.
```

## camera

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as camera.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a creator's small home editing desk late at night, single warm desk-lamp key with a faint cool window fill, true blacks, deep graphite shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: an isolated mid-ground cutout for a layered website hero. It MUST be a PNG with a genuinely transparent background (alpha channel), not a checkerboard pattern and not a white or black backdrop. If the tool supports a transparent background option, use it. Verify the saved PNG has an alpha channel (for example with Python PIL) and report whether it does.
Subject: a mirrorless camera with a medium zoom lens mounted on a tall, slim carbon-fibre tripod, legs spread, three-quarter view from slightly above eye level, the lens pointing toward the left. Matte black body with worn edges, no brand name and no markings on the body or lens. Lit by a warm desk lamp from the upper right: a thin warm rim light along the top of the camera, the lens barrel and one tripod leg, the rest in deep shadow. Complete object including all three tripod feet, nothing cropped, centred with a small margin.
Constraints: no readable text, no letters, numbers or words anywhere, no screens showing an interface or app (any screen is off or dark), no logos, no brand marks, no watermark, no people, no lens flare, no orange cast, no purple or magenta cast. No floor, no shadow on a ground plane, no background, no strap text.
```

## desk

Input: the Press Run `stone.webp` (camera angle and silhouette, so the hero measurements carry over).

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as desk.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a creator's small home editing desk late at night, single warm desk-lamp key with a faint cool window fill, true blacks, deep graphite shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the foreground plane of a layered website hero. A paper checklist and a phone are composited on its surface later in code, and a far room layer sits behind it.
Input image 1 is the camera angle and silhouette reference: keep exactly its oblique close view from above, the front edge running diagonally from lower left toward middle right, the broad flat top filling most of the frame, and the dark falloff in the top quarter (almost black, so it blends into the layer behind). Replace the stone and the type with a desk.
Subject: a matte charcoal-black desk with a fine, even linoleum-like surface and a thin satin edge. On the left third, where the reference has a frame of type, lie the tools of a photo edit: a small aluminium SD card reader with two memory cards beside it, a short coiled cable, and a slim closed laptop edge just entering the frame at the far left. All of them unbranded and unmarked. Warm desk-lamp light from the upper right grazes the surface and catches the front edge as a thin highlight. A large clear empty surface in the centre right.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no readable text, no letters, numbers or words anywhere, no screens showing an interface or app (any screen is off or dark), no logos, no brand marks, no watermark, no people, no lens flare, no orange cast, no purple or magenta cast. No papers, no glossy CGI look, no visible wood grain swirls.
```

## phone

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as phone.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a creator's small home editing desk late at night, single warm desk-lamp key with a faint cool window fill, true blacks, deep graphite shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: an isolated foreground cutout for a layered website hero; it will be blurred in code. It MUST be a PNG with a genuinely transparent background (alpha channel), not a checkerboard pattern and not a white or black backdrop. If the tool supports a transparent background option, use it. Verify the saved PNG has an alpha channel (for example with Python PIL) and report whether it does.
Subject: a modern smartphone lying face down on an invisible surface, seen from above at a low three-quarter angle, its back toward the camera: matte graphite back, a square camera bump with three lenses in one corner, rounded edges. No logo, no brand mark, no text anywhere. Warm desk-lamp light from the upper right gives a thin rim on the near edge and a soft reflection on the lenses; the rest in shadow. Complete object, nothing cropped, centred with a small margin.
Constraints: no readable text, no letters, numbers or words anywhere, no screens showing an interface or app (any screen is off or dark), no logos, no brand marks, no watermark, no people, no lens flare, no orange cast, no purple or magenta cast. No floor, no shadow on a ground plane, no background, no case.
```

## shot

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as shot.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a city street at blue hour after rain, true blacks, fine film grain, photographic realism.

Asset: a full-bleed website background that will sit behind frosted-glass panels, so it must read beautifully when heavily blurred. In code it is shown twice: once flattened to look like an unedited RAW file, once graded with a preset. Give it a full, rich tonal range so both treatments have room.
Scene: a quiet city street just after rain at blue hour, seen from the pavement at waist height, deliberately soft focus. Wet asphalt reflects warm amber streetlights and red car tail lights as long soft streaks; cool blue sky glow between dark buildings; large, round, soft bokeh. Large calm dark areas in the left half and along the bottom for text to sit over.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no readable text, no letters, numbers or words anywhere, no shop signs, no neon signs, no street signs, no licence plates, no logos, no watermark, no recognisable people (at most one tiny distant silhouette), no lens-flare streaks, no purple or magenta cast.
```

## prints-far

No reference image.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as prints-far.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a creator's small home editing desk late at night, single warm desk-lamp key with a faint cool window fill, true blacks, deep graphite shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the far plane behind a large chapter word on a website. It is shown dim and slightly blurred, so it must stay dark and calm.
Scene: a close, very shallow depth-of-field view of a wall covered with small photo prints in a loose grid, held with tape and bulldog clips, photographed so that every print is out of focus: soft rectangles of muted colour with paper edges catching warm lamp light from the right. The centre of the frame is the darkest and calmest area.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no readable text, no letters, numbers or words anywhere, no screens showing an interface or app (any screen is off or dark), no logos, no brand marks, no watermark, no people, no lens flare, no orange cast, no purple or magenta cast.
```

## rest

Input: the Press Run `rest.webp` (composition only).

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as rest.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a creator's small home editing desk late at night, single warm desk-lamp key with a faint cool window fill, true blacks, deep graphite shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: a full-bleed background for an authored pause in a website (a five-minute break). It must be quiet, dark and spacious, with a calm area in the centre and left for a short list of text.
Input image 1 is a composition reference only (camera height, where the light falls, the amount of darkness).
Scene: the editing desk at rest. A slim laptop closed, a smartphone face down beside it, a ceramic mug, a mirrorless camera lying on its side with the lens cap on, all unbranded. One warm desk lamp on the right makes a small pool of light on the desk; everything else falls into deep graphite shadow. Faint cool window light at the far right.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no readable text, no letters, numbers or words anywhere, no screens showing an interface or app (any screen is off or dark), no logos, no brand marks, no watermark, no people, no lens flare, no orange cast, no purple or magenta cast.
```

## room-day

Input: `room.png`.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as room-day.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a creator's small home editing desk the next morning, soft overcast daylight key from a tall window, true blacks, deep graphite shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the far background plane of the closing scene of a website. It must match Input image 1 exactly in camera, framing and architecture: the same back wall, the same grid of taped photo prints, the same lamp, the same tall window on the far right, the same plain dark painted wall in the upper left, the same dark floor in the bottom 30 percent.
Change only the time: the next morning. The lamp is off. Soft overcast daylight comes through the window on the right and spreads across the prints; the room is gently lit but still muted. The upper left wall stays dark enough for white text.
Framing: wide landscape 16:9, eye level, straight verticals, full bleed, no letterbox bars.
Constraints: no readable text, no letters, numbers or words anywhere, no screens showing an interface or app (any screen is off or dark), no logos, no brand marks, no watermark, no people, no lens flare, no orange cast, no purple or magenta cast. No sun disc, no sun rays.
```

## desk-day

Input: `desk.png`.

```text
Use your built-in image generation tool to create ONE image, then save the resulting PNG into the current working directory as desk-day.png (copy it from wherever the tool writes it). Do not edit any other files. Reply with the final file path and pixel size only.

Style preamble (verbatim): cinematic photograph, 35mm film, a creator's small home editing desk the next morning, soft overcast daylight key from a tall window, true blacks, deep graphite shadows, fine film grain, photographic realism, muted desaturated grade.

Asset: the foreground plane of the closing scene of a website. It must match Input image 1 exactly in camera angle, framing, desk shape, edge position and the card reader, memory cards, cable and laptop edge on the left third: the same oblique close view, the same diagonal front edge, the same dark falloff in the top quarter.
Change only the light and one detail: soft overcast morning daylight from the upper right, a little brighter and cooler than the lamp-lit version, a gentle pale highlight along the front edge. On the empty right half of the desk lies a short, neat stack of freshly printed photos, face down, plain white backs showing.
Framing: wide landscape 16:9, full bleed, no letterbox bars.
Constraints: no readable text, no letters, numbers or words anywhere, no screens showing an interface or app (any screen is off or dark), no logos, no brand marks, no watermark, no people, no lens flare, no orange cast, no purple or magenta cast. No glossy CGI look.
```
