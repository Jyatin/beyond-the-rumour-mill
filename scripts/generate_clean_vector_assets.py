import os
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import numpy as np

def create_crisp_stickers():
    src_path = r"C:\Users\ENOVO\.gemini\antigravity-ide\brain\e04b453f-8dec-42f6-8241-981dcbfd7d62\.user_uploaded\media_1791052549445.png"
    img = Image.open(src_path).convert("RGBA")
    
    # 1. First, let's clean any stray lines or text in the full image before cropping
    # The source is 1024 x 586
    # Top line artifacts are above y=64 (from the navbar bottom border). Let's erase them:
    # Stray text near bottom left: x: 260 to 360, y: 520 to 586
    # Stray text near bottom right: x: 670 to 730, y: 520 to 586
    
    clean_base = img.copy()
    draw = ImageDraw.Draw(clean_base)
    
    # Clean navbar line at top of hero
    draw.rectangle([0, 0, 1024, 66], fill=(255, 255, 255, 255))
    
    # Clean stray text fragments in bottom-left and bottom-right
    draw.rectangle([250, 480, 360, 586], fill=(255, 255, 255, 255))
    draw.rectangle([670, 480, 740, 586], fill=(255, 255, 255, 255))
    
    # Super-sample 4x with Lanczos
    scale = 4
    img_4x = clean_base.resize((1024 * scale, 586 * scale), Image.Resampling.LANCZOS)
    
    out_dir = "public/assets/crisp-stickers"
    os.makedirs(out_dir, exist_ok=True)
    
    def process_crisp(crop_img):
        arr = np.array(crop_img).astype(np.float32)
        r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
        
        # Calculate distance from white
        dist = np.sqrt((255.0 - r)**2 + (255.0 - g)**2 + (255.0 - b)**2)
        
        # Crisp alpha curve: sharpen ink edges
        alpha = np.clip((dist - 10.0) * 14.0, 0, 255)
        
        # Darken black ink lines slightly for razor-sharp contrast
        is_ink = (r < 100) & (g < 100) & (b < 100)
        arr[is_ink, 0] = np.maximum(0, arr[is_ink, 0] * 0.7)
        arr[is_ink, 1] = np.maximum(0, arr[is_ink, 1] * 0.7)
        arr[is_ink, 2] = np.maximum(0, arr[is_ink, 2] * 0.7)
        
        arr[:, :, 3] = alpha
        
        out = Image.fromarray(arr.astype(np.uint8))
        return out

    # 1. TOP-LEFT: Student preparing
    # Crop precisely between x: 18 to 275, y: 68 to 295
    tl = img_4x.crop((int(18 * scale), int(68 * scale), int(275 * scale), int(295 * scale)))
    tl_out = process_crisp(tl)
    tl_out.save(os.path.join(out_dir, "top-left-prep.png"), "PNG")
    print("Saved crisp top-left-prep.png:", tl_out.size)

    # 2. TOP-RIGHT: Alumnus celebrating
    # Crop precisely between x: 730 to 1010, y: 68 to 330
    tr = img_4x.crop((int(730 * scale), int(68 * scale), int(1010 * scale), int(330 * scale)))
    tr_out = process_crisp(tr)
    tr_out.save(os.path.join(out_dir, "top-right-offer.png"), "PNG")
    print("Saved crisp top-right-offer.png:", tr_out.size)

    # 3. BOTTOM-LEFT: Video call
    # Crop precisely between x: 25 to 275, y: 310 to 520
    bl = img_4x.crop((int(25 * scale), int(310 * scale), int(275 * scale), int(520 * scale)))
    bl_out = process_crisp(bl)
    bl_out.save(os.path.join(out_dir, "bottom-left-call.png"), "PNG")
    print("Saved crisp bottom-left-call.png:", bl_out.size)

    # 4. BOTTOM-RIGHT: Student typing with plant
    # Crop precisely between x: 740 to 1010, y: 320 to 520
    br = img_4x.crop((int(740 * scale), int(320 * scale), int(1010 * scale), int(520 * scale)))
    br_out = process_crisp(br)
    br_out.save(os.path.join(out_dir, "bottom-right-desk.png"), "PNG")
    print("Saved crisp bottom-right-desk.png:", br_out.size)

    # 5. GRADUATION CAP
    gc = img_4x.crop((int(540 * scale), int(465 * scale), int(615 * scale), int(525 * scale)))
    gc_out = process_crisp(gc)
    gc_out.save(os.path.join(out_dir, "accent-grad-cap.png"), "PNG")
    print("Saved crisp accent-grad-cap.png:", gc_out.size)

if __name__ == "__main__":
    create_crisp_stickers()
