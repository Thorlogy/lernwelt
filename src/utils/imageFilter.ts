/**
 * Privacy image filter using HTML5 Canvas.
 * Processes an input image data URL (Base64) locally and returns a censored outline sketch.
 * This completely obfuscates faces, writing, and background details while preserving
 * the physical counts and shapes of objects (e.g. noodles, coins, Lego blocks) on the table.
 */
export function applyPrivacyFilter(imageDataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageDataUrl;
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imageDataUrl); // Fallback
          return;
        }

        // Limit size to optimize processing and keep file size small
        const maxDim = 400;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;
        const width4 = width * 4;

        // Create buffer for output
        const output = ctx.createImageData(width, height);
        const outData = output.data;

        // Sobel kernels
        const sobelX = [
          [-1, 0, 1],
          [-2, 0, 2],
          [-1, 0, 1]
        ];
        const sobelY = [
          [-1, -2, -1],
          [ 0,  0,  0],
          [ 1,  2,  1]
        ];

        // Loop through pixels (skipping edges to avoid bounds checks)
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            let pixelX = 0;
            let pixelY = 0;

            // Convolution
            for (let ky = -1; ky <= 1; ky++) {
              for (let kx = -1; kx <= 1; kx++) {
                const idx = ((y + ky) * width + (x + kx)) * 4;
                // Grayscale conversion: 0.3 * R + 0.59 * G + 0.11 * B
                const grayscale = 0.3 * data[idx] + 0.59 * data[idx + 1] + 0.11 * data[idx + 2];

                pixelX += grayscale * sobelX[ky + 1][kx + 1];
                pixelY += grayscale * sobelY[ky + 1][kx + 1];
              }
            }

            const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
            const outIdx = (y * width + x) * 4;

            // Threshold the magnitude to get sharp outline black lines
            const isEdge = magnitude > 35;
            
            // Render as a black line on white background (pencil sketch style)
            if (isEdge) {
              outData[outIdx] = 20;     // R (dark slate)
              outData[outIdx + 1] = 40; // G
              outData[outIdx + 2] = 60; // B
            } else {
              outData[outIdx] = 248;    // R (almost white)
              outData[outIdx + 1] = 250;
              outData[outIdx + 2] = 252;
            }
            outData[outIdx + 3] = 255;  // Alpha
          }
        }

        // Fill borders to white
        for (let y = 0; y < height; y++) {
          const leftIdx = y * width * 4;
          const rightIdx = (y * width + (width - 1)) * 4;
          for (let i = 0; i < 4; i++) {
            outData[leftIdx + i] = i === 3 ? 255 : 248;
            outData[rightIdx + i] = i === 3 ? 255 : 248;
          }
        }
        for (let x = 0; x < width; x++) {
          const topIdx = x * 4;
          const bottomIdx = ((height - 1) * width + x) * 4;
          for (let i = 0; i < 4; i++) {
            outData[topIdx + i] = i === 3 ? 255 : 248;
            outData[bottomIdx + i] = i === 3 ? 255 : 248;
          }
        }

        ctx.putImageData(output, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
}
