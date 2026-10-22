"""
Generates the Open Graph social card at public/og/default.png.

Run:  python scripts/make-og.py

A designed card rather than the bare logo. The previous build used
/images/EngiSpider-fnl.png — a 742x404 logo — as its og:image, so every
share on LinkedIn, WhatsApp or X rendered a letterboxed logo on grey with no
words on it. At 1200x630 with the value proposition set in type, the card
carries the message even when nobody clicks.

Kept as a script, not a build step: it needs Pillow and a system font, and
the output changes perhaps twice a year. Commit the PNG.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

INK = (10, 15, 26)
BODY = (71, 85, 105)
MUTED = (148, 163, 184)
ORANGE = (251, 124, 31)
HAIRLINE = (228, 234, 242)
WHITE = (255, 255, 255)

ROOT = Path(__file__).resolve().parent.parent

# Windows ships these; fall back to DejaVu on Linux CI.
FONT_CANDIDATES = {
    "bold": ["C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf",
             "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"],
    "regular": ["C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf",
                "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"],
    "mono": ["C:/Windows/Fonts/consola.ttf", "C:/Windows/Fonts/cour.ttf",
             "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"],
}


def font(kind: str, size: int):
    for path in FONT_CANDIDATES[kind]:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def main() -> None:
    img = Image.new("RGB", (W, H), WHITE)
    d = ImageDraw.Draw(img)

    # Faint structural grid — the same motif the site is built on.
    for x in range(0, W, 72):
        d.line([(x, 0), (x, H)], fill=HAIRLINE, width=1)
    for y in range(0, H, 72):
        d.line([(0, y), (W, y)], fill=HAIRLINE, width=1)

    # Orange rule down the left edge.
    d.rectangle([0, 0, 10, H], fill=ORANGE)

    pad_x = 72

    # Logo
    logo_path = ROOT / "public" / "images" / "EngiSpider-fnl.png"
    if logo_path.exists():
        logo = Image.open(logo_path).convert("RGBA")
        logo.thumbnail((300, 160), Image.LANCZOS)
        img.paste(logo, (pad_x, 64), logo)

    # Headline
    f_h = font("bold", 66)
    lines = ["Software that runs", "restaurants, campuses", "and laboratories."]
    y = 236
    for line in lines:
        d.text((pad_x, y), line, font=f_h, fill=INK)
        y += 74

    # Supporting line
    f_b = font("regular", 25)
    d.text(
        (pad_x, y + 22),
        "13 products in production  ·  Custom software on Java, Spring Boot & React",
        font=f_b,
        fill=BODY,
    )

    # Footer meta rule
    f_m = font("mono", 21)
    rule_y = H - 92
    d.line([(pad_x, rule_y), (W - pad_x, rule_y)], fill=HAIRLINE, width=2)
    d.text((pad_x, rule_y + 26), "ENGISPIDER.COM", font=f_m, fill=INK)

    right = "BHUBANESWAR, ODISHA  ·  ISO CERTIFIED"
    w = d.textbbox((0, 0), right, font=f_m)[2]
    d.text((W - pad_x - w, rule_y + 26), right, font=f_m, fill=MUTED)

    out = ROOT / "public" / "og"
    out.mkdir(parents=True, exist_ok=True)
    img.save(out / "default.png", "PNG", optimize=True)
    print(f"wrote {out / 'default.png'}  ({(out / 'default.png').stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
