const Tesseract = require('tesseract.js');
const path = require('path');

async function testOCR() {
  try {
    const ocrResult = await Tesseract.recognize(path.join(__dirname, 'backend', 'package.json'), 'eng', {
        logger: () => {}, // suppress verbose logs
        langPath: 'https://tessdata.projectnaptha.com/4.0.0',
        corePath: 'https://unpkg.com/tesseract.js-core@v5.0.0/tesseract-core.wasm.js',
        workerPath: 'https://unpkg.com/tesseract.js@v5.0.4/dist/worker.min.js'
    });
    console.log("Success:", ocrResult.data.text.substring(0, 50));
  } catch (e) {
    console.error("Error:", e);
  }
}

testOCR();
