import { createServerFn } from "@tanstack/react-start";
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
    // The RPC is service-role only and composes the notification email itself
    // from these raw fields, so no caller-supplied email content is possible.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const db = supabaseAdmin as unknown as {
      rpc: (
        fn: string,
        args?: unknown,
      ) => Promise<{ data: unknown; error: { message: string } | null }>;
    };

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
