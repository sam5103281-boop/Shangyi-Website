import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const contactSchema = z.object({
  topic: z.enum(["b2b", "spec", "comwell"]),
  name: z.string().trim().min(1, "請輸入姓名").max(100, "姓名過長"),
  org: z.string().trim().max(100, "單位名稱過長").optional(),
  title: z.string().trim().max(100, "職稱過長").optional(),
  phone: z.string().trim().min(1, "請輸入聯絡電話").max(50, "電話號碼過長"),
  email: z.string().trim().email("請輸入有效的電子郵件").max(255, "電子郵件過長"),
  message: z.string().trim().min(1, "請輸入諮詢內容").max(2000, "諮詢內容過長"),
});

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Uses only the public key so it also works on the Cloudflare deployment
    // (www.shangyi-care.com), which has no service-role key. The RPC is
    // SECURITY DEFINER, validates input, writes one row and notifies a fixed
    // recipient; anon cannot read contact_submissions.
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"];
    if (!url || !key) {
      console.error("Contact submission error: missing SUPABASE_URL / publishable key");
      throw new Error("提交失敗，請稍後再試");
    }

    const db = createClient(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await db.rpc("submit_contact_and_notify", {
      p_topic: data.topic,
      p_name: data.name,
      p_org: data.org ?? "",
      p_title: data.title ?? "",
      p_phone: data.phone,
      p_email: data.email,
      p_message: data.message,
    });

    if (error) {
      console.error("Contact submission error:", error.message);
      throw new Error("提交失敗，請稍後再試");
    }

    return { success: true };
  });
