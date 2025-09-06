const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Convert PNG logo to favicon
async function createFavicon() {
  try {
    const inputPath = path.join(__dirname, 'public', 'logo-color-final-001-transparent.png');
    const outputPath = path.join(__dirname, 'public', 'favicon.ico');

    // Create favicon in multiple sizes (16x16, 32x32, 48x48)
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(outputPath);

    console.log('✅ Favicon created successfully at:', outputPath);

    // Also create additional sizes for better browser support
    const sizes = [16, 32, 48];

    for (const size of sizes) {
      const sizeOutputPath = path.join(__dirname, 'public', `favicon-${size}x${size}.png`);
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(sizeOutputPath);
      console.log(`✅ Created ${size}x${size} favicon at:`, sizeOutputPath);
    }

  } catch (error) {
    console.error('❌ Error creating favicon:', error);
  }
}

createFavicon();
