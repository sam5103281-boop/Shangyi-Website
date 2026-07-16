import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import * as React from "react";
import { render } from "@react-email/render";
import type { Database } from "@/integrations/supabase/types";
import { template as contactNotification } from "@/lib/email-templates/contact-notification";

const contactSchema = z.object({
  topic: z.enum(["b2b", "spec", "comwell"]),
  name: z.string().trim().min(1, "請輸入姓名").max(100, "姓名過長"),
  org: z.string().trim().max(100, "單位名稱過長").optional(),
  title: z.string().trim().max(100, "職稱過長").optional(),
  phone: z.string().trim().min(1, "請輸入聯絡電話").max(50, "電話號碼過長"),
  email: z.string().trim().email("請輸入有效的電子郵件").max(255, "電子郵件過長"),
  message: z.string().trim().min(1, "請輸入諮詢內容").max(2000, "諮詢內容過長"),
});

const SITE_NAME = "shangyi-care";
const SENDER_DOMAIN = "notify.shangyi-care.com";
const FROM_DOMAIN = "shangyi-care.com";
const NOTIFICATION_RECIPIENT = "shangyi@shangyi-care.com";

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

    try {
      const submittedAt = new Date().toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        hour12: false,
      });
      const templateData = {
        topic: data.topic,
        name: data.name,
        org: data.org ?? "",
        title: data.title ?? "",
        phone: data.phone,
        email: data.email,
        message: data.message,
        submittedAt,
      };

      const element = React.createElement(contactNotification.component, templateData);
      const html = await render(element);
      const text = await render(element, { plainText: true });
      const subject =
        typeof contactNotification.subject === "function"
          ? contactNotification.subject(templateData)
          : contactNotification.subject;

      const db = supabase as unknown as {
        rpc: (fn: string, args?: unknown) => Promise<{ data: unknown; error: { message: string } | null }>;
      };

      const { error: submitError } = await db.rpc("submit_contact_and_notify", {
        p_topic: data.topic,
        p_name: data.name,
        p_org: data.org ?? "",
        p_title: data.title ?? "",
        p_phone: data.phone,
        p_email: data.email,
        p_message: data.message,
        p_subject: subject,
        p_html: html,
        p_text: text,
      });

      if (submitError) throw new Error(submitError.message);
    } catch (emailErr) {
      console.error("Contact notification email error:", emailErr);
      throw new Error("提交失敗，請稍後再試");
    }

    return { success: true };
  });
