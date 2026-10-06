import os
import cv2
import numpy as np
from PIL import Image, ImageFilter

def process_ultra_sharp_hero():
    src_path = r"C:\Users\ENOVO\.gemini\antigravity-ide\brain\e04b453f-8dec-42f6-8241-981dcbfd7d62\.user_uploaded\media_1791054179527.png"
    img_bgr = cv2.imread(src_path)
    h, w, _ = img_bgr.shape
    print(f"Source image size: {w}x{h}")
    
    # Hero region is y = 62 to 586 (height = 524)
    hero_bgr = img_bgr[62:h, 0:w]
    hh, hw, _ = hero_bgr.shape
    
    # Target scale = 4x (4096 x 2096)
    scale = 4
    target_w = hw * scale
    target_h = hh * scale
    
    # Upscale base image with Lanczos
    hero_up = cv2.resize(hero_bgr, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
    
    # Convert to HSV and RGB
    hsv = cv2.cvtColor(hero_up, cv2.COLOR_BGR2HSV)
    rgb = cv2.cvtColor(hero_up, cv2.COLOR_BGR2RGB)
    gray = cv2.cvtColor(hero_up, cv2.COLOR_BGR2GRAY)
    
    # 1. Detect pure / near white background
    # Everything with high brightness and low saturation is background/white paper
    white_bg_mask = (gray > 240) & (hsv[:, :, 1] < 30)
    
    # 2. Extract Color Regions
    # Teal color (shirts, book, brand accents): Hue roughly 80-100 (in 0-180 cv2 range) or BGR with strong G/B
    teal_mask = (hsv[:, :, 0] >= 75) & (hsv[:, :, 0] <= 105) & (hsv[:, :, 1] >= 50) & (hsv[:, :, 2] >= 50) & (hsv[:, :, 2] <= 210)
    
    # Pink color (stars, triangles, accents): Hue 145-175
    pink_mask = (hsv[:, :, 0] >= 140) & (hsv[:, :, 0] <= 175) & (hsv[:, :, 1] >= 40)
    
    # Light Cyan / Blue (speech bubbles, sparkles):
    cyan_mask = (hsv[:, :, 0] >= 85) & (hsv[:, :, 0] <= 115) & (hsv[:, :, 1] >= 20) & (hsv[:, :, 1] < 90) & (hsv[:, :, 2] > 180)
    
    # Grey (laptops, cards):
    grey_mask = (hsv[:, :, 1] < 25) & (gray >= 180) & (gray <= 235)
    
    # 3. Extract Black Linework
    # Black lines have low brightness (gray < 165) and are not strong saturated colors
    line_prob = np.clip((225.0 - gray) / 130.0, 0.0, 1.0)
    
    # Boost contrast of line_prob with a sigmoid curve to make edges razor sharp without staircasing
    line_sharp = np.power(line_prob, 1.8) * 1.4
    line_sharp = np.clip(line_sharp, 0.0, 1.0)
    
    # Remove lines from center text area
    # In 1x coords: x: 278 to 746, y: 10 to 410
    cx1 = int(278 * scale)
    cx2 = int(746 * scale)
    cy1 = int(10 * scale)
    cy2 = int(410 * scale)
    line_sharp[cy1:cy2, cx1:cx2] = 0.0
    
    # 4. Construct clean high-res master image
    # Start with pure white canvas
    master_rgb = np.full((target_h, target_w, 3), 255, dtype=np.uint8)
    
    # Layer 1: Clean RGB color fills with smoothed masks
    # Use original upscaled colors for fidelity, but clamp pure white on background
    color_layer = rgb.copy()
    color_layer[white_bg_mask] = [255, 255, 255]
    color_layer[cy1:cy2, cx1:cx2] = [255, 255, 255]
    
    # Layer 2: Alpha blend razor sharp solid dark lines (#111111) over the color layer
    # Line color is #121212 (almost pitch black)
    ink_color = np.array([18, 18, 20], dtype=np.float32)
    
    # Composite: output = color_layer * (1 - line_sharp) + ink_color * line_sharp
    alpha = np.expand_dims(line_sharp, axis=-1)
    comp = (color_layer.astype(np.float32) * (1.0 - alpha * 0.95) + ink_color * (alpha * 0.95))
    comp = np.clip(comp, 0, 255).astype(np.uint8)
    
    # Ensure center text area is 100% pure white
    comp[cy1:cy2, cx1:cx2] = [255, 255, 255]
    
    # Convert to PIL Image for high-quality PNG save
    out_img = Image.fromarray(comp)
    
    # Subtle unsharp mask on the final composite to maximize crispness on Retina screens
    out_img = out_img.filter(ImageFilter.UnsharpMask(radius=1.5, percent=130, threshold=3))
    
    out_path = "public/assets/hero-master-crisp-4x.png"
    out_img.save(out_path, "PNG", optimize=True)
    print(f"Successfully generated ultra-sharp master canvas: {out_path} ({out_img.size})")

if __name__ == "__main__":
    process_ultra_sharp_hero()
