import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const contactSchema = z.object({
  topic: z.enum(["b2b", "spec", "comwell"]),
  name: z.string().trim().min(1, "請輸入姓名").max(100, "姓名過長"),
  org: z.string().trim().max(100, "單位名稱過長").optional(),
  title: z.string().trim().max(100, "職稱過長").optional(),
  phone: z.string().trim().min(1, "請輸入聯絡電話").max(50, "電話號碼過長"),
  email: z.string().trim().email("請輸入有效的電子郵件").max(255, "電子郵件過長"),
  message: z.string().trim().min(1, "請輸入諮詢內容").max(2000, "諮詢內容過長"),
});

function createServerSupabaseClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        storage: undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createServerSupabaseClient();

    // Use a SECURITY DEFINER function so anonymous users can submit contact
    // requests without being granted direct write access to the table.
    const { error } = await supabase.rpc("submit_contact", {
      p_topic: data.topic,
      p_name: data.name,
      p_org: (data.org ?? null) as unknown as string,
      p_title: (data.title ?? null) as unknown as string,
      p_phone: data.phone,
      p_email: data.email,
      p_message: data.message,
    });

    if (error) {
      console.error("Contact submission error:", error);
      throw new Error("提交失敗，請稍後再試");
    }

    return { success: true };
  });
