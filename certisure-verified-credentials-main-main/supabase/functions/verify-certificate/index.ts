// supabase/functions/verify-certificate/index.ts

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const { certificateId, imageUrl } = await req.json();

    if (!certificateId || !imageUrl) {
      return new Response(
        JSON.stringify({ error: "Missing certificateId or imageUrl" }),
        { status: 400 }
      );
    }

    // Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    /* --------------------------------------------------
       STEP 1: OCR (Mock / Replace with real OCR if needed)
    -------------------------------------------------- */

    // 🔹 In real use, replace this with Vision API / OCR service
    const todayStr = new Date().toLocaleDateString('en-GB'); // DD/MM/YYYY
    const ocrText = `
      Certificate of Completion
      This is to certify that the student has successfully completed the course.
      Institution: Sample Institute
      Course: Web Development
      Student Name: John Doe
      Date of Issue: ${todayStr} 
    `;

    // Confidence score (mocked for now)
    const confidenceScore = 0.85;

    /* --------------------------------------------------
       STEP 2: VERIFICATION LOGIC
    -------------------------------------------------- */

    let verificationStatus = "verified";
    let rejectionReason: string | null = null;

    // Basic OCR validation
    if (!ocrText || ocrText.trim().length < 50) {
      verificationStatus = "fake";
      rejectionReason = "Certificate text could not be reliably extracted.";
    }

    // Keyword validation
    const requiredKeywords = [
      "certificate",
      "course",
      "student",
      "institution"
    ];

    const lowerText = ocrText.toLowerCase();
    const missingKeywords = requiredKeywords.filter(
      (word) => !lowerText.includes(word)
    );

    if (missingKeywords.length > 2) {
      verificationStatus = "fake";
      rejectionReason =
        "Certificate content does not match expected structure.";
    }


    // --- DATE VALIDATION SECTION ---
    // Regex to capture dates: supports YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY, Month DD, YYYY
    const datePattern = /(\b\d{4}[-./]\d{1,2}[-./]\d{1,2}\b)|(\b\d{1,2}[-./]\d{1,2}[-./]\d{4}\b)|(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4}\b)/i;
    const dateMatch = ocrText.match(datePattern);

    if (dateMatch) {
      const dateStr = dateMatch[0];

      // Helper to parse date robustly
      const parseCertificateDate = (str: string): Date => {
        // Check for DD/MM/YYYY or DD.MM.YYYY or DD-MM-YYYY
        // This regex matches: (1-2 digits) separator (1-2 digits) separator (4 digits)
        const dmyMatch = str.match(/^(\d{1,2})[-./](\d{1,2})[-./](\d{4})$/);
        if (dmyMatch) {
          const p1 = parseInt(dmyMatch[1], 10);
          const p2 = parseInt(dmyMatch[2], 10);
          const year = parseInt(dmyMatch[3], 10);

          // If p1 > 12, it MUST be DD-MM-YYYY (e.g. 26.09.2025)
          if (p1 > 12) {
            return new Date(year, p2 - 1, p1);
          }
          // If p2 > 12, it MUST be MM-DD-YYYY (e.g. 09.26.2025 - rare but possible)
          if (p2 > 12) {
            return new Date(year, p1 - 1, p2);
          }
          // Ambiguous (e.g. 02.03.2025)
          // Since we use en-GB, prefer DD-MM-YYYY
          return new Date(year, p2 - 1, p1);
        }
        return new Date(str);
      };

      const parsedDate = parseCertificateDate(dateStr);

      if (!isNaN(parsedDate.getTime())) {
        // Normalize both dates to midnight to ignore time of day issues
        const checkDate = new Date(parsedDate);
        checkDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Debug log
        console.log(`Extracted Date: ${dateStr} -> Parsed: ${checkDate.toISOString()} vs Today: ${today.toISOString()}`);

        if (checkDate > today) {
          verificationStatus = "fake";
          rejectionReason = `Certificate date (${dateStr}) is in the future.`;
        }
      }
    }

    // Confidence score check
    if (confidenceScore < 0.4) {
      verificationStatus = "fake";
      rejectionReason =
        "Low confidence score in certificate verification.";
    }

    /* --------------------------------------------------
       STEP 3: UPDATE DATABASE
    -------------------------------------------------- */

    const { error: updateError } = await supabase
      .from("certificates")
      .update({
        is_verified: verificationStatus === "verified",
        verification_status: verificationStatus,
        rejection_reason: rejectionReason,
        confidence_score: confidenceScore,
        raw_ocr_text: ocrText,
        updated_at: new Date().toISOString()
      })
      .eq("id", certificateId);

    if (updateError) {
      console.error("Database update failed:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update certificate record" }),
        { status: 500 }
      );
    }

    /* --------------------------------------------------
       STEP 4: RESPONSE
    -------------------------------------------------- */

    return new Response(
      JSON.stringify({
        status: verificationStatus,
        reason: rejectionReason,
        confidenceScore
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Verification error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
});
