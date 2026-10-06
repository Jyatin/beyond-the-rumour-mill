import os
from PIL import Image, ImageEnhance
import numpy as np

def refine_assets():
    src_path = r"C:\Users\ENOVO\.gemini\antigravity-ide\brain\e04b453f-8dec-42f6-8241-981dcbfd7d62\.user_uploaded\media_1791052549445.png"
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    print(f"Source size: {w}x{h}")
    
    # Scale 3x using high-quality Lanczos resampling for ultra-sharp Retina rendering
    scale = 3
    img_3x = img.resize((w * scale, h * scale), Image.Resampling.LANCZOS)
    
    out_dir = "public/assets/exact-stickers"
    os.makedirs(out_dir, exist_ok=True)
    
    # High-precision transparency extraction that preserves anti-aliased dark ink outlines and pastel fills
    def clean_alpha_cutout(crop_img):
        arr = np.array(crop_img).astype(np.float32)
        r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
        
        # Calculate distance from pure white (255, 255, 255)
        # Background in reference is pure white (255, 255, 255)
        dist = np.sqrt((255.0 - r)**2 + (255.0 - g)**2 + (255.0 - b)**2)
        
        # Smooth alpha mask: 0 for pure white, smooth ramp up to 255 for ink & watercolor
        alpha = np.clip(dist * 10.0, 0, 255)
        
        # Set alpha channel
        arr[:, :, 3] = np.minimum(a, alpha)
        
        out = Image.fromarray(arr.astype(np.uint8))
        return out

    # 1. TOP-LEFT: Complete Student with Lightbulb, Laptop, Books, Coffee, Checklist Card, Stars
    # Full generous bounding box in 1x coordinates: x: 10 to 295, y: 55 to 305
    tl = img_3x.crop((int(10 * scale), int(55 * scale), int(295 * scale), int(305 * scale)))
    tl_clean = clean_alpha_cutout(tl)
    tl_clean.save(os.path.join(out_dir, "top-left-prep.png"), "PNG")
    print("Saved top-left-prep.png:", tl_clean.size)
    
    # 2. TOP-RIGHT: Complete Celebrating Alumnus with Raised Fist, OFFER Document, Briefcase, LinkedIn Card, Stars
    # Full generous bounding box in 1x coordinates: x: 720 to 1018, y: 55 to 345
    tr = img_3x.crop((int(720 * scale), int(55 * scale), int(1018 * scale), int(345 * scale)))
    tr_clean = clean_alpha_cutout(tr)
    tr_clean.save(os.path.join(out_dir, "top-right-offer.png"), "PNG")
    print("Saved top-right-offer.png:", tr_clean.size)
    
    # 3. BOTTOM-LEFT: Complete Video Call Window with Camera, Girl, Boy thumbnail, Speech Bubble
    # Full generous bounding box in 1x coordinates: x: 10 to 350, y: 300 to 555
    bl = img_3x.crop((int(10 * scale), int(300 * scale), int(350 * scale), int(555 * scale)))
    bl_clean = clean_alpha_cutout(bl)
    bl_clean.save(os.path.join(out_dir, "bottom-left-call.png"), "PNG")
    print("Saved bottom-left-call.png:", bl_clean.size)
    
    # 4. BOTTOM-RIGHT: Complete Student Typing with Laptop, Stack of Books, Potted Plant, Arrow
    # Full generous bounding box in 1x coordinates: x: 690 to 1015, y: 315 to 555
    br = img_3x.crop((int(690 * scale), int(315 * scale), int(1015 * scale), int(555 * scale)))
    br_clean = clean_alpha_cutout(br)
    br_clean.save(os.path.join(out_dir, "bottom-right-desk.png"), "PNG")
    print("Saved bottom-right-desk.png:", br_clean.size)
    
    # 5. GRADUATION CAP: Center-bottom accent
    # x: 535 to 625, y: 460 to 535
    gc = img_3x.crop((int(535 * scale), int(460 * scale), int(625 * scale), int(535 * scale)))
    gc_clean = clean_alpha_cutout(gc)
    gc_clean.save(os.path.join(out_dir, "accent-grad-cap.png"), "PNG")
    print("Saved accent-grad-cap.png:", gc_clean.size)

if __name__ == "__main__":
    refine_assets()
