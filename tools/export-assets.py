"""Export the OneTap photography from lab/gen/preset/<name>/<name>.png. Needs Pillow and numpy.

Exports the plates and cutouts to assets/img (WebP only; the page uses WebP).

Plates: Lanczos to 2400 px wide, quality 80.
Cutouts: cropped to the alpha bounding box (plus a small margin), Lanczos to a
fixed width, WebP with alpha, quality 82. Alpha at 240 or above is made fully
opaque (the generator leaves solid objects at about 250).
The shot: one photograph, exported twice. shot-raw is the photograph flattened
the way an unedited RAW file looks (lifted blacks, low contrast, muted colour);
shot-edit is the same photograph with the PRESET below applied. The page
crossfades between them, so the edit it shows is a real preset, applied in code.
usage: python tools/export-assets.py [name ...]
"""
import os, sys
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERE = os.path.join(ROOT, 'lab', 'gen', 'preset')   # raw Codex outputs, one folder per asset
OUT = os.path.join(ROOT, 'assets', 'img')
PLATES = ['room', 'room-day', 'desk', 'desk-day', 'prints-far', 'rest']
CUTS = {'camera': 760, 'phone': 900}

# What a camera's flat profile does to the photograph.
RAW = {'exposure': -0.2, 'contrast': -0.3, 'pivot': 0.22, 'blacks': 0.035, 'saturation': -0.5, 'tint': (0.985, 1.0, 0.97)}
# The preset: the edit, saved once.
PRESET = {'exposure': 0.1, 'contrast': 0.35, 'blacks': -0.02, 'saturation': 0.12,
          'shadows_tint': (-0.03, 0.04, 0.05), 'highlights_tint': (0.07, 0.025, -0.05)}


def luma(x):
    return (x @ np.array([0.2126, 0.7152, 0.0722]))[..., None]


def saturate(x, amount):
    return luma(x) + (x - luma(x)) * (1 + amount)


def flatten(x, p=RAW):
    x = x * 2 ** p['exposure']
    # A night shot sits low: pivot the contrast near its own mid tone.
    x = p['pivot'] + (x - p['pivot']) * (1 + p['contrast'])
    x = p['blacks'] + x * (1 - p['blacks'])
    x = saturate(x, p['saturation']) * np.array(p['tint'])
    return np.clip(x, 0, 1)


def apply_preset(x, p=PRESET):
    x = np.clip(x * 2 ** p['exposure'], 0, 1)
    s = x * x * (3 - 2 * x)                       # an S-curve
    x = x + (s - x) * p['contrast']
    x = p['blacks'] + x * (1 - p['blacks'])
    L = luma(x)
    x = x + (1 - L) ** 2 * np.array(p['shadows_tint']) + L ** 2 * np.array(p['highlights_tint'])
    return np.clip(saturate(x, p['saturation']), 0, 1)


def save_plate(im, name):
    w = 2400; h = round(im.height * w / im.width / 2) * 2
    im = im.resize((w, h), Image.LANCZOS)
    p = os.path.join(OUT, name + '.webp'); im.save(p, 'WEBP', quality=80, method=6)
    return p, im.size


def plate(n):
    return save_plate(Image.open(os.path.join(HERE, n, n + '.png')).convert('RGB'), n)


def shot():
    x = np.asarray(Image.open(os.path.join(HERE, 'shot', 'shot.png')).convert('RGB'), dtype=np.float64) / 255
    out = []
    for name, fn in (('shot-raw', flatten), ('shot-edit', apply_preset)):
        im = Image.fromarray((fn(x) * 255 + 0.5).astype(np.uint8))
        out.append(save_plate(im, name))
    return out


def cut(n, width):
    im = Image.open(os.path.join(HERE, n, n + '.png')).convert('RGBA')
    a = im.getchannel('A').point(lambda v: 255 if v >= 240 else v)
    im.putalpha(a)
    l, t, r, b = a.point(lambda v: 255 if v > 8 else 0).getbbox()
    m = 6
    im = im.crop((max(0, l - m), max(0, t - m), min(im.width, r + m), min(im.height, b + m)))
    im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    p = os.path.join(OUT, n + '.webp'); im.save(p, 'WEBP', quality=82, method=6, exact=False)
    return p, im.size


if __name__ == '__main__':
    names = sys.argv[1:] or PLATES + list(CUTS) + ['shot']
    for n in names:
        if not os.path.exists(os.path.join(HERE, n, n + '.png')):
            print('missing', n); continue
        if n == 'shot':
            for p, size in shot(): print(os.path.basename(p), size, os.path.getsize(p))
            continue
        p, size = cut(n, CUTS[n]) if n in CUTS else plate(n)
        print(n, size, os.path.getsize(p))
