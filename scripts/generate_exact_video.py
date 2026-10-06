import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import subprocess

def create_exact_animation():
    input_path = "public/assets/hero-exact-surround.png"
    out_mp4 = "public/assets/hero-exact-animation.mp4"
    out_webm = "public/assets/hero-exact-animation.webm"
    
    base_img = Image.open(input_path).convert("RGBA")
    width, height = base_img.size
    
    fps = 30
    duration_sec = 4.0
    total_frames = int(fps * duration_sec)
    
    frames_dir = "temp_exact_frames"
    os.makedirs(frames_dir, exist_ok=True)
    
    base_arr = np.array(base_img, dtype=np.float32)
    y_coords, x_coords = np.mgrid[0:height, 0:width].astype(np.float32)
    
    # Define animation zones for the 4 corners:
    # 1. Top-Left student: x in [40, 260], y in [50, 260]
    tl_mask = np.exp(-((x_coords - 150)**2 / (2 * 80**2) + (y_coords - 160)**2 / (2 * 80**2)))
    
    # 2. Top-Right celebrating student: x in [760, 980], y in [40, 260]
    tr_mask = np.exp(-((x_coords - 870)**2 / (2 * 90**2) + (y_coords - 140)**2 / (2 * 90**2)))
    
    # 3. Bottom-Left video call: x in [80, 280], y in [320, 480]
    bl_mask = np.exp(-((x_coords - 180)**2 / (2 * 80**2) + (y_coords - 400)**2 / (2 * 60**2)))
    
    # 4. Bottom-Right student: x in [780, 960], y in [320, 480]
    br_mask = np.exp(-((x_coords - 860)**2 / (2 * 80**2) + (y_coords - 410)**2 / (2 * 60**2)))

    # Sparkle centers across the illustration
    sparkles = [
        (85, 95, 0.0, 10),      # Top-left lightbulb sparkle
        (235, 120, 1.2, 8),     # Top-left doodle
        (785, 175, 2.5, 9),     # Top-right star
        (965, 335, 3.8, 11),    # Right middle star
        (75, 345, 4.2, 10),     # Bottom-left star
        (335, 490, 5.0, 8),     # Bottom ribbon sparkle
        (665, 485, 1.8, 9),     # Bottom right sparkle
        (735, 385, 3.2, 8),     # Right arrow sparkle
    ]

    print(f"Generating {total_frames} frames for exact hero video loop...")
    
    for f in range(total_frames):
        t = f / total_frames
        theta = 2.0 * math.pi * t
        
        # Subtle organic breathing & micro-motions
        tl_breath = math.sin(theta) * 1.4
        tr_celebrate = math.sin(theta + 0.5) * 1.6
        bl_talk = math.sin(theta + math.pi * 0.7) * 1.2
        br_type = math.sin(theta + math.pi * 1.2) * 1.2
        
        sample_x = x_coords - (
            tr_mask * (math.cos(theta) * 0.8)
        )
        sample_y = y_coords - (
            tl_mask * tl_breath +
            tr_mask * tr_celebrate +
            bl_mask * bl_talk +
            br_mask * br_type
        )
        
        sample_x = np.clip(sample_x, 0, width - 1).astype(np.int32)
        sample_y = np.clip(sample_y, 0, height - 1).astype(np.int32)
        
        frame_arr = base_arr[sample_y, sample_x].copy()
        
        frame_img = Image.fromarray(np.clip(frame_arr, 0, 255).astype(np.uint8), mode="RGBA")
        overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        
        # Twinkling Stars & Sparkles
        for (sx, sy, phase_offset, size) in sparkles:
            sparkle_val = 0.5 + 0.5 * math.sin(theta + phase_offset)
            glow_radius = size * (0.8 + 0.6 * sparkle_val)
            glow_alpha = int(40 + 120 * sparkle_val)
            
            draw.ellipse(
                [sx - glow_radius, sy - glow_radius, sx + glow_radius, sy + glow_radius],
                fill=(245, 220, 160, int(glow_alpha * 0.4))
            )
            
            ray_len = size * (0.6 + 0.5 * sparkle_val)
            draw.line([sx - ray_len, sy, sx + ray_len, sy], fill=(255, 240, 190, glow_alpha), width=2)
            draw.line([sx, sy - ray_len, sx, sy + ray_len], fill=(255, 240, 190, glow_alpha), width=2)

        overlay_blurred = overlay.filter(ImageFilter.GaussianBlur(1.0))
        frame_img = Image.alpha_composite(frame_img, overlay_blurred)
        
        frame_final = frame_img.convert("RGB")
        frame_filename = os.path.join(frames_dir, f"frame_{f:04d}.png")
        frame_final.save(frame_filename, "PNG")
        
    print("Encoding video with FFmpeg...")
    
    mp4_cmd = [
        "ffmpeg", "-y",
        "-framerate", str(fps),
        "-i", os.path.join(frames_dir, "frame_%04d.png"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "17",
        "-preset", "slow",
        "-movflags", "+faststart",
        out_mp4
    ]
    subprocess.run(mp4_cmd, check=True)
    
    webm_cmd = [
        "ffmpeg", "-y",
        "-framerate", str(fps),
        "-i", os.path.join(frames_dir, "frame_%04d.png"),
        "-c:v", "libvpx-vp9",
        "-crf", "24",
        "-b:v", "0",
        out_webm
    ]
    subprocess.run(webm_cmd, check=True)
    
    for f in os.listdir(frames_dir):
        os.remove(os.path.join(frames_dir, f))
    os.rmdir(frames_dir)
    
    print(f"Successfully generated:\n- {out_mp4}\n- {out_webm}")

if __name__ == "__main__":
    create_exact_animation()
