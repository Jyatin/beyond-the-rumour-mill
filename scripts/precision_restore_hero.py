import cv2
import numpy as np
from PIL import Image, ImageFilter

def perfect_editorial_restore():
    src_path = r"C:\Users\ENOVO\.gemini\antigravity-ide\brain\e04b453f-8dec-42f6-8241-981dcbfd7d62\.user_uploaded\media_1791054179527.png"
    img = cv2.imread(src_path)
    h, w, _ = img.shape
    
    # 1. Crop hero area (y = 62 to 586)
    hero = img[62:h, 0:w]
    hh, hw, _ = hero.shape
    
    # 2. Precision erase central text & button elements in 1x space:
    clean_hero = hero.copy()
    cv2.rectangle(clean_hero, (330, 14), (690, 52), (255, 255, 255), -1)
    cv2.rectangle(clean_hero, (280, 68), (740, 240), (255, 255, 255), -1)
    cv2.rectangle(clean_hero, (295, 242), (730, 335), (255, 255, 255), -1)
    cv2.rectangle(clean_hero, (360, 335), (710, 400), (255, 255, 255), -1)
    
    # 3. Super-Resolution Upscaling to 4x (4096 x 2096)
    scale = 4
    target_w = hw * scale
    target_h = hh * scale
    
    hero_4x = cv2.resize(clean_hero, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
    
    # Convert to color spaces
    hsv = cv2.cvtColor(hero_4x, cv2.COLOR_BGR2HSV)
    gray = cv2.cvtColor(hero_4x, cv2.COLOR_BGR2GRAY)
    rgb = cv2.cvtColor(hero_4x, cv2.COLOR_BGR2RGB)
    
    # 4. Color Smoothing (Bilateral filter to smooth flat colors without blurring main edges)
    smooth_rgb = cv2.bilateralFilter(rgb, d=9, sigmaColor=75, sigmaSpace=75)
    
    # Background whitening
    bg_mask = (gray > 240) & (hsv[:, :, 1] < 30)
    smooth_rgb[bg_mask] = [255, 255, 255]
    
    # 5. Crisp Black Line Extraction
    # Black lines have very low saturation (< 35) and low intensity (< 115)
    # We create a crisp line profile
    is_ink = (gray < 115) & (hsv[:, :, 1] < 35)
    
    # Edge gradient magnitude for crisp contours
    grad_x = cv2.Sobel(gray, cv2.CV_32F, 1, 0, ksize=3)
    grad_y = cv2.Sobel(gray, cv2.CV_32F, 0, 1, ksize=3)
    grad_mag = np.sqrt(grad_x**2 + grad_y**2)
    grad_norm = np.clip(grad_mag / 120.0, 0, 1)
    
    # Combine intensity drop and edge sharpness
    line_alpha = np.clip((140.0 - gray) / 90.0, 0, 1)
    line_alpha[~is_ink & (gray >= 70)] = 0
    line_alpha = np.power(line_alpha, 1.4)
    
    # In center text zones, line_alpha = 0
    cv2.rectangle(line_alpha, (int(320 * scale), int(14 * scale)), (int(695 * scale), int(52 * scale)), 0.0, -1)
    cv2.rectangle(line_alpha, (int(280 * scale), int(68 * scale)), (int(742 * scale), int(240 * scale)), 0.0, -1)
    cv2.rectangle(line_alpha, (int(295 * scale), int(242 * scale)), (int(730 * scale), int(335 * scale)), 0.0, -1)
    cv2.rectangle(line_alpha, (int(360 * scale), int(335 * scale)), (int(710 * scale), int(400 * scale)), 0.0, -1)
    
    # Ink color is #111111
    ink_rgb = np.array([17, 17, 19], dtype=np.float32)
    
    # Composite: smooth_rgb underneath, crisp ink on top
    comp = smooth_rgb.astype(np.float32) * (1.0 - np.expand_dims(line_alpha, -1)) + ink_rgb * np.expand_dims(line_alpha, -1)
    comp = np.clip(comp, 0, 255).astype(np.uint8)
    
    # Clear background and center to pure 255
    comp[bg_mask] = [255, 255, 255]
    cv2.rectangle(comp, (int(320 * scale), int(14 * scale)), (int(695 * scale), int(52 * scale)), (255, 255, 255), -1)
    cv2.rectangle(comp, (int(280 * scale), int(68 * scale)), (int(742 * scale), int(240 * scale)), (255, 255, 255), -1)
    cv2.rectangle(comp, (int(295 * scale), int(242 * scale)), (int(730 * scale), int(335 * scale)), (255, 255, 255), -1)
    cv2.rectangle(comp, (int(360 * scale), int(335 * scale)), (int(710 * scale), int(400 * scale)), (255, 255, 255), -1)
    
    # Save as high-res PNG
    out_img = Image.fromarray(comp)
    out_path = "public/assets/hero-master-crisp-4x.png"
    out_img.save(out_path, "PNG", optimize=True)
    print(f"Perfect editorial restore complete: {out_path} ({out_img.size})")

if __name__ == "__main__":
    perfect_editorial_restore()
