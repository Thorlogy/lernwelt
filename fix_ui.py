import os
import glob
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Remove uppercase and letter-spacing classes
    content = re.sub(r'\buppercase\b', '', content)
    content = re.sub(r'\btracking-widest\b', '', content)
    content = re.sub(r'\btracking-wider\b', '', content)
    content = re.sub(r'\btracking-wide\b', '', content)
    
    # Replace tiny font sizes with text-base or text-lg
    content = re.sub(r'\btext-xs\b', 'text-base', content)
    content = re.sub(r'\btext-sm\b', 'text-lg', content)
    content = re.sub(r'text-\[10px\]', 'text-base', content)
    content = re.sub(r'text-\[8px\]', 'text-sm', content)
    content = re.sub(r'text-\[9px\]', 'text-sm', content)

    # Clean up double spaces in classNames
    content = re.sub(r' {2,}', ' ', content)

    with open(filepath, 'w') as f:
        f.write(content)

# Process App.tsx
process_file('/Users/tleimbach/antigravity/Lernwelt/src/App.tsx')

# Process all components
for filepath in glob.glob('/Users/tleimbach/antigravity/Lernwelt/src/components/*.tsx'):
    process_file(filepath)

print("Done removing ALL CAPS and increasing font sizes!")
