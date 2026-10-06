import os
from PIL import Image, ImageFilter
import numpy as np

def extract_assets():
    src_path = r"C:\Users\ENOVO\.gemini\antigravity-ide\brain\e04b453f-8dec-42f6-8241-981dcbfd7d62\.user_uploaded\media_1791052549445.png"
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    print(f"Loaded source image: {w}x{h}")
    
    # First, upscale 2x with Lanczos to get ultra-high-resolution detail
    scale = 2
    img_hi = img.resize((w * scale, h * scale), Image.Resampling.LANCZOS)
    hw, hh = img_hi.size
    
    out_dir = "public/assets/exact-stickers"
    os.makedirs(out_dir, exist_ok=True)
    
    # Function to convert near-white pixels into clean transparency
    def make_transparent(crop_img, threshold=248):
        arr = np.array(crop_img).astype(np.float32)
        # Compute brightness of RGB
        rgb = arr[:, :, :3]
        # White distance
        dist_from_white = np.sqrt(np.sum((255.0 - rgb) ** 2, axis=-1))
        
        # Alpha: if near white, fade to 0; if ink/color, stay 255
        alpha = np.clip(dist_from_white * 12.0, 0, 255)
        
        # For darker lines and colors, preserve exact alpha
        # Combine with original alpha
        arr[:, :, 3] = np.minimum(arr[:, :, 3], alpha)
        
        return Image.fromarray(arr.astype(np.uint8))
        
    # 1. TOP-LEFT: Student with laptop, books, coffee, lightbulb idea, </> checklist
    # In original 1024x586 (Hero starts y~62):
    # x: 20 to 280, y: 70 to 320 -> in 2x: x: 40 to 560, y: 140 to 640
    tl = img_hi.crop((20 * scale, 64 * scale, 280 * scale, 310 * scale))
    tl_trans = make_transparent(tl)
    tl_trans.save(os.path.join(out_dir, "top-left-prep.png"), "PNG")
    print("Saved top-left-prep.png:", tl_trans.size)
    
    # 2. TOP-RIGHT: Alumnus celebrating with OFFER document, briefcase, stars, LinkedIn badge
    # x: 730 to 1010, y: 64 to 345 -> in 2x: x: 1460 to 2020, y: 128 to 690
    tr = img_hi.crop((730 * scale, 64 * scale, 1015 * scale, 345 * scale))
    tr_trans = make_transparent(tr)
    tr_trans.save(os.path.join(out_dir, "top-right-offer.png"), "PNG")
    print("Saved top-right-offer.png:", tr_trans.size)
    
    # 3. BOTTOM-LEFT: Video call window with girl talking, boy thumbnail, camera icon, speech bubble
    # x: 20 to 360, y: 310 to 550 -> in 2x: x: 40 to 720, y: 620 to 1100
    bl = img_hi.crop((20 * scale, 310 * scale, 360 * scale, 550 * scale))
    bl_trans = make_transparent(bl)
    bl_trans.save(os.path.join(out_dir, "bottom-left-call.png"), "PNG")
    print("Saved bottom-left-call.png:", bl_trans.size)
    
    # 4. BOTTOM-RIGHT: Student typing at laptop with stack of books, potted plant, arrow
    # x: 690 to 1005, y: 320 to 545 -> in 2x: x: 1380 to 2010, y: 640 to 1090
    br = img_hi.crop((690 * scale, 320 * scale, 1010 * scale, 550 * scale))
    br_trans = make_transparent(br)
    br_trans.save(os.path.join(out_dir, "bottom-right-desk.png"), "PNG")
    print("Saved bottom-right-desk.png:", br_trans.size)
    
    # 5. GRADUATION CAP (Center-bottom)
    # x: 540 to 620, y: 460 to 530
    grad = img_hi.crop((540 * scale, 460 * scale, 620 * scale, 530 * scale))
    grad_trans = make_transparent(grad)
    grad_trans.save(os.path.join(out_dir, "accent-grad-cap.png"), "PNG")
    print("Saved accent-grad-cap.png:", grad_trans.size)
    
    # 6. FULL CLEAN BACKGROUND CANVAS (with flowing lines and decorations intact, center text protected/clean)
    hero_canvas = img_hi.crop((0, int(60 * scale), hw, hh))
    
    # Erase the center text area in high-res canvas:
    # x: 280 to 740, y: 10 to 400 (relative to hero top)
    hero_clean = hero_canvas.copy()
    from PIL import ImageDraw
    draw = ImageDraw.Draw(hero_clean)
    draw.rectangle([int(275 * scale), int(10 * scale), int(745 * scale), int(395 * scale)], fill=(255, 255, 255, 255))
    hero_clean.save("public/assets/hero-exact-editorial-canvas.png", "PNG")
    print("Saved hero-exact-editorial-canvas.png:", hero_clean.size)

if __name__ == "__main__":
    extract_assets()
