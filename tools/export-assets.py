"""Export the PressRun photography from lab/gen/press/<name>/<name>.png. Needs Pillow.

Export the PressRun plates and cutouts to assets/img (WebP only; the page uses WebP).

Plates: Lanczos to 2400 px wide, quality 80.
Cutouts: cropped to the alpha bounding box (plus a small margin), Lanczos to a
fixed width, WebP with alpha, quality 82. The roller is turned 90 degrees
clockwise first, so its handle trails to the left as it rolls right.
usage: python tools/export-assets.py [name ...]
"""
import os, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERE = os.path.join(ROOT, "lab", "gen", "press")   # raw Codex outputs, one folder per asset
OUT = os.path.join(ROOT, 'assets', 'img')
PLATES = ['shop', 'hero-shop', 'stone', 'type-far', 'rest', 'shop-day', 'hero-shop-day', 'stone-day']
CUTS = {'press': 1400, 'brayer': 900, 'roller': 600}


def plate(n):
    im = Image.open(os.path.join(HERE, n, n + '.png')).convert('RGB')
    w = 2400; h = round(im.height * w / im.width / 2) * 2
    im = im.resize((w, h), Image.LANCZOS)
    p = os.path.join(OUT, n + '.webp'); im.save(p, 'WEBP', quality=80, method=6)
    return p, im.size


def cut(n, width):
    im = Image.open(os.path.join(HERE, n, n + '.png')).convert('RGBA')
    if n == 'roller':
        im = im.transpose(Image.ROTATE_270)
    a = im.getchannel('A').point(lambda v: 255 if v > 8 else 0)
    l, t, r, b = a.getbbox()
    m = 6
    im = im.crop((max(0, l - m), max(0, t - m), min(im.width, r + m), min(im.height, b + m)))
    if n == 'roller':
        h = width * 3 // 2; im = im.resize((round(im.width * h / im.height), h), Image.LANCZOS)
    else:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    p = os.path.join(OUT, n + '.webp'); im.save(p, 'WEBP', quality=82, method=6, exact=False)
    return p, im.size


if __name__ == '__main__':
    names = sys.argv[1:] or PLATES + list(CUTS)
    for n in names:
        if not os.path.exists(os.path.join(HERE, n, n + '.png')):
            print('missing', n); continue
        p, size = cut(n, CUTS[n]) if n in CUTS else plate(n)
        print(n, size, os.path.getsize(p))
