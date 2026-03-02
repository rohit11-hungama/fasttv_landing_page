
import re
import os
import urllib.request
from urllib.parse import urlparse

# The file containing the Figma output
# Adjust path if needed
FIGMA_OUTPUT_FILE = "/Users/bhanupratapsingh/.gemini/antigravity/brain/c81f9796-caec-45a0-b954-7c57a6accc3e/.system_generated/steps/175/output.txt"
ASSET_DIR = "src/assets/figma"

# Ensure asset directory exists
os.makedirs(ASSET_DIR, exist_ok=True)

# Regex to find const img... = "..."
# Note: The file content provided in the view_file tool output might be truncated or formatted.
# I will read the file line by line to be safe.

print(f"Reading from {FIGMA_OUTPUT_FILE}")

with open(FIGMA_OUTPUT_FILE, "r") as f:
    content = f.read()

# Pattern to capture variable name and URL
# const imgRectangle9211 = "http://localhost:3845/assets/c8fa78b5e6d82d45bad15232f8cf16ada1756a34.png";
pattern = re.compile(r'const (\w+) = "(http://localhost:3845/assets/[^"]+)";')

matches = pattern.findall(content)
print(f"Found {len(matches)} assets to download.")

asset_map = {}

for var_name, url in matches:
    filename = os.path.basename(urlparse(url).path)
    local_path = os.path.join(ASSET_DIR, filename)
    
    # print(f"Downloading {url} to {local_path}...")
    try:
        # Check if file already exists to save time? No, overwrite to be safe.
        urllib.request.urlretrieve(url, local_path)
        asset_map[var_name] = filename
    except Exception as e:
        print(f"Error downloading {url}: {e}")

print("Download complete. Generating map file...")

# Generate a mapping file for easy import in TS/JS
with open(os.path.join("src", "assets", "figma_assets.ts"), "w") as f:
    f.write("// Auto-generated asset map from Figma output\n")
    
    # Imports
    for var_name, filename in asset_map.items():
        f.write(f"import {var_name}_src from './figma/{filename}';\n")
    
    f.write("\nexport const assets = {\n")
    for var_name, _ in asset_map.items():
        f.write(f"  {var_name}: {var_name}_src,\n")
    f.write("};\n")

print("Asset map generated at src/assets/figma_assets.ts")
