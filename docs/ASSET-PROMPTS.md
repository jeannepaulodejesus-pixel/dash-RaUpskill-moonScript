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

