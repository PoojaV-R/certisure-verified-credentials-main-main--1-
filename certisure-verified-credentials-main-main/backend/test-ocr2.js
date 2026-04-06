const Tesseract = require('tesseract.js');
async function testOCR() {
  try {
    const ocrResult = await Tesseract.recognize('./package.json', 'eng', {
      logger: () => {}, 
      langPath: 'https://tessdata.projectnaptha.com/4.0.0',
    });
    console.log("Success OCR text snippet:", ocrResult.data.text.substring(0, 50));
  } catch (err) {
    console.error("Test OCR error:", err);
  }
}
testOCR();
