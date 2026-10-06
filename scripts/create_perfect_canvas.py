import os
from PIL import Image, ImageDraw
import numpy as np

def create_perfect_canvas():
    src_path = r"C:\Users\ENOVO\.gemini\antigravity-ide\brain\e04b453f-8dec-42f6-8241-981dcbfd7d62\.user_uploaded\media_1791052549445.png"
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    print(f"Source size: {w}x{h}")
    
    # 1. Navbar height in source is y = 0 to 62
    # Hero is y = 62 to 586 (height = 524)
    hero_raw = img.crop((0, 62, w, h))
    
    # 2. Upscale 3x with Lanczos for ultra-crisp Retina clarity (3072 x 1572)
    scale = 3
    hero_3x = hero_raw.resize((w * scale, 524 * scale), Image.Resampling.LANCZOS)
    hw, hh = hero_3x.size
    
    # 3. Clean ONLY the central area where the HTML text, pill, and buttons will sit
    # In 1x coords (relative to hero top y=0):
    # Center text box: x: 290 to 734, y: 15 to 395
    # Let's clean this area with pure white (255, 255, 255, 255)
    hero_clean = hero_3x.copy()
    draw = ImageDraw.Draw(hero_clean)
    
    draw.rectangle(
        [int(290 * scale), int(15 * scale), int(734 * scale), int(395 * scale)],
        fill=(255, 255, 255, 255)
    )
    
    out_path = "public/assets/hero-perfect-master-canvas.png"
    hero_clean.save(out_path, "PNG")
    print(f"Saved perfect master canvas to {out_path} ({hero_clean.size})")

if __name__ == "__main__":
    create_perfect_canvas()
