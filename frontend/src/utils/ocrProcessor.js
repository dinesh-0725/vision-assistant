// src/utils/ocrProcessor.js
import Tesseract from 'tesseract.js';

/**
 * Enhanced OCR processor with better preprocessing for handwritten text
 */
class OCRProcessor {
  constructor() {
    this.worker = null;
    this.isProcessing = false;
  }

  /**
   * Preprocess image to improve OCR accuracy
   * @param {string} imageData - Base64 image data
   * @returns {Promise<HTMLCanvasElement>} - Preprocessed canvas
   */
  async preprocessImage(imageData) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image
        ctx.drawImage(img, 0, 0);
        
        // Get image data for processing
        const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageDataObj.data;
        
        // Apply preprocessing filters
        this.applyFilters(data, canvas.width, canvas.height);
        
        // Put processed data back
        ctx.putImageData(imageDataObj, 0, 0);
        
        // Apply additional canvas processing
        this.applyCanvasFilters(ctx, canvas);
        
        resolve(canvas);
      };
      img.src = imageData;
    });
  }

  /**
   * Apply image filters to improve text recognition
   */
  applyFilters(data, width, height) {
    // Convert to grayscale and enhance contrast
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Convert to grayscale (luminosity method)
      const gray = 0.21 * r + 0.72 * g + 0.07 * b;
      
      // Enhance contrast
      const enhanced = gray < 128 ? gray * 0.8 : Math.min(gray * 1.2, 255);
      
      data[i] = enhanced;
      data[i + 1] = enhanced;
      data[i + 2] = enhanced;
      // Keep alpha channel as is
    }
  }

  /**
   * Apply canvas-based filters
   */
  applyCanvasFilters(ctx, canvas) {
    // Get current image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Apply threshold for better text detection
    const threshold = 128;
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const value = avg > threshold ? 255 : 0;
      
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  /**
   * Detect if text is handwritten or printed
   */
  detectTextType(canvas) {
    // Simple detection based on image characteristics
    // This could be enhanced with ML models
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let edgeCount = 0;
    let pixelCount = 0;
    
    // Simple edge detection
    for (let y = 1; y < canvas.height - 1; y++) {
      for (let x = 1; x < canvas.width - 1; x++) {
        const idx = (y * canvas.width + x) * 4;
        const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
        
        if (brightness < 200) {
          pixelCount++;
          
          // Check neighbors
          const topIdx = ((y - 1) * canvas.width + x) * 4;
          const bottomIdx = ((y + 1) * canvas.width + x) * 4;
          const leftIdx = (y * canvas.width + (x - 1)) * 4;
          const rightIdx = (y * canvas.width + (x + 1)) * 4;
          
          const topBright = (data[topIdx] + data[topIdx + 1] + data[topIdx + 2]) / 3;
          const bottomBright = (data[bottomIdx] + data[bottomIdx + 1] + data[bottomIdx + 2]) / 3;
          const leftBright = (data[leftIdx] + data[leftIdx + 1] + data[leftIdx + 2]) / 3;
          const rightBright = (data[rightIdx] + data[rightIdx + 1] + data[rightIdx + 2]) / 3;
          
          if (Math.abs(brightness - topBright) > 50 ||
              Math.abs(brightness - bottomBright) > 50 ||
              Math.abs(brightness - leftBright) > 50 ||
              Math.abs(brightness - rightBright) > 50) {
            edgeCount++;
          }
        }
      }
    }
    
    // Simple heuristic: handwritten text tends to have more edges per pixel
    const edgeRatio = edgeCount / Math.max(pixelCount, 1);
    
    return edgeRatio > 0.5 ? 'handwritten' : 'printed';
  }

  /**
   * Perform OCR with enhanced configuration
   */
  async performOCR(imageData, options = {}) {
    if (this.isProcessing) {
      throw new Error('OCR is already processing');
    }

    this.isProcessing = true;
    
    try {
      console.log('[OCR] Starting enhanced OCR processing...');
      
      // Preprocess image
      const preprocessedCanvas = await this.preprocessImage(imageData);
      
      // Detect text type
      const textType = this.detectTextType(preprocessedCanvas);
      console.log(`[OCR] Detected text type: ${textType}`);
      
      // Convert canvas to data URL
      const processedImageData = preprocessedCanvas.toDataURL('image/png');
      
      // Configure Tesseract based on text type
      const tesseractConfig = {
        logger: options.logger || (m => console.log('[Tesseract]', m)),
        lang: textType === 'handwritten' ? 'eng' : 'eng', // For handwritten, we might need special training data
        oem: 1, // Use LSTM engine for better accuracy
        psm: textType === 'handwritten' ? 7 : 3, // Page segmentation mode
        // Additional parameters for better recognition
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?-()\'\"/:;',
        preserve_interword_spaces: '1',
        user_defined_dpi: '300'
      };

      // Add handwritten-specific configurations
      if (textType === 'handwritten') {
        Object.assign(tesseractConfig, {
          tessedit_pageseg_mode: '7', // Treat image as a single text line
          tessedit_ocr_engine_mode: '1', // Use LSTM only
          textord_heavy_nr: '0', // Reduce noise removal for handwritten
        });
      }

      console.log(`[OCR] Using configuration for ${textType} text`);
      
      // Perform OCR with retry logic
      let result;
      let attempts = 0;
      const maxAttempts = 2;
      
      while (attempts < maxAttempts) {
        attempts++;
        console.log(`[OCR] Attempt ${attempts}/${maxAttempts}`);
        
        try {
          result = await Tesseract.recognize(
            processedImageData,
            'eng',
            tesseractConfig
          );
          
          // If we got a decent result, break
          if (result.data.text.trim().length > 0) {
            break;
          }
          
          // Try different PSM on second attempt
          if (attempts === 1) {
            tesseractConfig.psm = textType === 'handwritten' ? 8 : 6;
          }
        } catch (error) {
          console.warn(`[OCR] Attempt ${attempts} failed:`, error.message);
          if (attempts === maxAttempts) throw error;
        }
      }
      
      console.log('[OCR] OCR completed successfully');
      return {
        text: result.data.text.trim(),
        confidence: result.data.confidence,
        textType,
        blocks: result.data.blocks || []
      };
      
    } catch (error) {
      console.error('[OCR] Error during OCR processing:', error);
      throw error;
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Analyze image and provide feedback
   */
  async analyzeImage(imageData) {
    const canvas = await this.preprocessImage(imageData);
    const textType = this.detectTextType(canvas);
    
    const ctx = canvas.getContext('2d');
    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageDataObj.data;
    
    // Analyze image characteristics
    let darkPixelCount = 0;
    let totalPixels = canvas.width * canvas.height;
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      if (avg < 150) darkPixelCount++;
    }
    
    const darknessRatio = darkPixelCount / totalPixels;
    
    return {
      textType,
      darknessRatio,
      resolution: `${canvas.width}x${canvas.height}`,
      recommended: darknessRatio > 0.1 && darknessRatio < 0.3 ? 
        'Good for OCR' : 'Try better lighting or contrast'
    };
  }

  /**
   * Clean up resources
   */
  destroy() {
    if (this.worker) {
      this.worker.terminate();
    }
  }
}

// Create singleton instance
export const ocrProcessor = new OCRProcessor();
export default OCRProcessor;