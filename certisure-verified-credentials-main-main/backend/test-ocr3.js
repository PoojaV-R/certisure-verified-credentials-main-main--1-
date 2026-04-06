const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

async function testOCR() {
  const filePath = path.join(__dirname, 'uploads', '1775385629333-f88250c1-92e9-4285-a23d-5449b660b1b1.jpg');
  
  // Also what happens if we DON'T provide absolute paths? Let's trace it.
  console.log("Testing default config...");
  try {
    const res3 = await Tesseract.recognize(filePath, 'eng', {
      logger: e => console.log(e.status, e.progress),
      langPath: 'https://tessdata.projectnaptha.com/4.0.0'
    });
    console.log("Default Success:", res3.data.text.substring(0, 30));
  } catch (err) {
    console.error("Default Error:", err.message);
  }
}

testOCR();
