#!/usr/bin/env node

const borderPrompts = {
  'gold-lapis': {
    name: 'Gold/Lapis (Royal)',
    prompt: `Create a seamless, tileable Persian Islamic decorative border (Islimi/Arabesque) on transparent background. 
Style: Safavid-era illuminated manuscript.
Colors: Deep lapis lazuli blue (#1a237e) background with intricate gold (#ffd700) floral and geometric patterns.
Elements: Flowing arabesque vines, pointed holly leaves, geometric tessellations, and delicate gold filigree.
Mood: Royal, opulent, sacred.
Dimensions: 400x400 pixels, seamless tiling in all directions.
The design should be continuous and can be tiled horizontally and vertically without visible seams.`,
  },
  'turquoise-sand': {
    name: 'Turquoise/Sand (Mystic)',
    prompt: `Create a seamless, tileable Persian Islamic decorative border (Islimi/Arabesque) on transparent background.
Style: Sufi mystic manuscript illumination.
Colors: Warm sand/beige (#d4a574) background with turquoise (#40e0d0) and copper (#b87333) floral patterns.
Elements: Mystical spiraling vines, cypress tree silhouettes, tulips, and flowing arabesque scrolls.
Mood: Desert mysticism, spiritual yearning, wandering dervish.
Dimensions: 400x400 pixels, seamless tiling in all directions.
The design should be continuous and can be tiled horizontally and vertically without visible seams.`,
  },
  'black-gold': {
    name: 'Black/Gold (Melancholy)',
    prompt: `Create a seamless, tileable Persian Islamic decorative border (Islimi/Arabesque) on transparent background.
Style: Elegant mourning poetry manuscript.
Colors: Deep black (#0a0a0a) background with subtle metallic gold (#c9a962) and ivory (#fffff0) patterns.
Elements: Elegant thin vines, tear-drop motifs, small flowers, and delicate geometric stars.
Mood: Melancholy, poetic, contemplative, grief transformed to beauty.
Dimensions: 400x400 pixels, seamless tiling in all directions.
The design should be continuous and can be tiled horizontally and vertically without visible seams.`,
  },
  'white-silver': {
    name: 'White/Silver (Ethereal)',
    prompt: `Create a seamless, tileable Persian Islamic decorative border (Islimi/Arabesque) on transparent background.
Style: Celestial/spiritual illumination.
Colors: Pure white (#ffffff) background with silver (#c0c0c0) and pale blue (#b3e5fc) ethereal patterns.
Elements: Light floating flowers, delicate sprigs, subtle geometric mandalas, and feather-light vines.
Mood: Ethereal, heavenly, transcendent, pure light.
Dimensions: 400x400 pixels, seamless tiling in all directions.
The design should be continuous and can be tiled horizontally and vertically without visible seams.`,
  },
};

console.log('=== Persian Border Prompts for DALL-E 3 ===\n');

Object.entries(borderPrompts).forEach(([key, value]) => {
  console.log(`\n--- ${value.name} ---`);
  console.log(`Filename: ${key}.png`);
  console.log(`\n${value.prompt}\n`);
  console.log('='.repeat(60));
});

console.log('\n\n=== Instructions ===');
console.log('1. Use these prompts with DALL-E 3 (or Midjourney)');
console.log('2. Generate at 1024x1024 or higher for quality');
console.log('3. Save as PNG with transparent background');
console.log('4. Place in /public/assets/borders/');
console.log('5. Use CSS border-image for implementation');
