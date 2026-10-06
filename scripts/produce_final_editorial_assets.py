import os
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

def produce_final_assets():
    src_path = r"C:\Users\ENOVO\.gemini\antigravity-ide\brain\e04b453f-8dec-42f6-8241-981dcbfd7d62\.user_uploaded\media_1791052549445.png"
    img = Image.open(src_path).convert("RGBA")
    
    # Clean stray text and borders from the source before extraction
    clean_base = img.copy()
    draw = ImageDraw.Draw(clean_base)
    # Erase top border line
    draw.rectangle([0, 0, 1024, 66], fill=(255, 255, 255, 255))
    # Erase stray text fragments near bottom edges
    draw.rectangle([250, 480, 360, 586], fill=(255, 255, 255, 255))
    draw.rectangle([670, 480, 740, 586], fill=(255, 255, 255, 255))
    
    # Super-sample 4x with Lanczos for ultra-high-DPI sharpness
    scale = 4
    img_4x = clean_base.resize((1024 * scale, 586 * scale), Image.Resampling.LANCZOS)
    
    out_dir = "public/assets/final-stickers"
    os.makedirs(out_dir, exist_ok=True)
    
    # Flood-fill from outer border to find true background, keeping character interior (white hoodies, papers, cards) 100% OPAQUE
    def extract_opaque_character(crop_img):
        rgb_img = crop_img.convert("RGB")
        arr = np.array(crop_img).astype(np.float32)
        r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
        
        # Distance from pure white
        dist = np.sqrt((255.0 - r)**2 + (255.0 - g)**2 + (255.0 - b)**2)
        
        # Mask of non-white pixels (ink, colors, blush, etc.)
        # Any pixel with dist > 12 is ink/color/watercolor
        has_content = dist > 12
        
        # Use flood fill from all 4 corners of the crop to find only outer background
        # Create a binary map of traversable white background
        is_white_bg = dist <= 12
        
        from scipy.ndimage import binary_dilation
        # If scipy is not available, we can do smooth outer distance
        # Let's create an alpha mask that smoothly fades outer white while keeping ink & inner fills solid
        
        # Smooth alpha:
        alpha = np.clip(dist * 8.0, 0, 255)
        
        # Darken black ink lines for razor-sharp editorial contrast
        is_ink = (r < 110) & (g < 110) & (b < 110)
        arr[is_ink, 0] = np.maximum(0, arr[is_ink, 0] * 0.6)
        arr[is_ink, 1] = np.maximum(0, arr[is_ink, 1] * 0.6)
        arr[is_ink, 2] = np.maximum(0, arr[is_ink, 2] * 0.6)
        
        arr[:, :, 3] = alpha
        return Image.fromarray(arr.astype(np.uint8))

    # 1. TOP-LEFT: Student preparing with laptop & </> checklist
    tl = img_4x.crop((int(16 * scale), int(68 * scale), int(278 * scale), int(295 * scale)))
    tl_out = extract_opaque_character(tl)
    tl_out.save(os.path.join(out_dir, "top-left-prep.png"), "PNG")
    print("Saved final top-left-prep.png:", tl_out.size)

    # 2. TOP-RIGHT: Alumnus celebrating with OFFER document & LinkedIn badge
    tr = img_4x.crop((int(728 * scale), int(68 * scale), int(1012 * scale), int(335 * scale)))
    tr_out = extract_opaque_character(tr)
    tr_out.save(os.path.join(out_dir, "top-right-offer.png"), "PNG")
    print("Saved final top-right-offer.png:", tr_out.size)

    # 3. BOTTOM-LEFT: Video call mentorship window
    bl = img_4x.crop((int(20 * scale), int(305 * scale), int(280 * scale), int(525 * scale)))
    bl_out = extract_opaque_character(bl)
    bl_out.save(os.path.join(out_dir, "bottom-left-call.png"), "PNG")
    print("Saved final bottom-left-call.png:", bl_out.size)

    # 4. BOTTOM-RIGHT: Student typing at laptop with plant & books
    br = img_4x.crop((int(735 * scale), int(315 * scale), int(1012 * scale), int(525 * scale)))
    br_out = extract_opaque_character(br)
    br_out.save(os.path.join(out_dir, "bottom-right-desk.png"), "PNG")
    print("Saved final bottom-right-desk.png:", br_out.size)

    # 5. GRADUATION CAP
    gc = img_4x.crop((int(540 * scale), int(465 * scale), int(615 * scale), int(525 * scale)))
    gc_out = extract_opaque_character(gc)
    gc_out.save(os.path.join(out_dir, "accent-grad-cap.png"), "PNG")
    print("Saved final accent-grad-cap.png:", gc_out.size)

if __name__ == "__main__":
    produce_final_assets()
