import { supabase } from "@/integrations/supabase/client";

export interface Certificate {
  id: string;
  student_name: string | null;
  institution: string | null;
  course: string | null;
  year: string | null;
  is_verified: boolean | null;
  rejection_reason: string | null;
  confidence_score: number | null;
  image_url: string | null;
  file_path: string | null;
  verification_status: string;
  raw_ocr_text: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/* =========================
   UPLOAD CERTIFICATE
========================= */
export async function uploadCertificate(
  file: File
): Promise<{ certificateId: string; imageUrl: string }> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}_${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  // Upload file to storage
  const { error: uploadError } = await supabase.storage
    .from("certificates")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw new Error("Failed to upload certificate file");
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("certificates").getPublicUrl(filePath);

  // Insert DB record
  const { data, error: insertError } = await supabase
    .from("certificates")
    .insert({
      file_path: filePath,
      image_url: publicUrl,
      verification_status: "pending",
      is_verified: false,
    })
    .select("id")
    .maybeSingle(); // ✅ FIX

  if (insertError || !data) {
    console.error("Insert error:", insertError);
    throw new Error("Failed to create certificate record");
  }

  return { certificateId: data.id, imageUrl: publicUrl };
}

/* =========================
   VERIFY CERTIFICATE
========================= */
export async function verifyCertificate(
  certificateId: string,
  imageUrl: string
): Promise<void> {
  const { error } = await supabase.functions.invoke(
    "verify-certificate",
    {
      body: { certificateId, imageUrl },
    }
  );

  if (error) {
    console.error("Verification error:", error);
    throw new Error("Certificate verification failed");
  }
}

/* =========================
   GET CERTIFICATE (FIXED)
========================= */
export async function getCertificate(
  id: string
): Promise<Certificate | null> {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // ✅ CRITICAL FIX

  if (error) {
    console.error("Fetch error:", error);
    return null;
  }

  return data ? (data as Certificate) : null;
}
