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

    // 1. Store the contact submission via SECURITY DEFINER RPC.
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

    // 2. Render notification email and enqueue for delivery. Never let email
    //    failures block the form submission — the row is already persisted.
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

      const messageId = crypto.randomUUID();
      const idempotencyKey = `contact-${messageId}`;

      await supabase.from("email_send_log").insert({
        message_id: messageId,
        template_name: "contact-notification",
        recipient_email: NOTIFICATION_RECIPIENT,
        status: "pending",
      });

      const { error: enqueueError } = await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          message_id: messageId,
          to: NOTIFICATION_RECIPIENT,
          from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
          reply_to: data.email,
          sender_domain: SENDER_DOMAIN,
          subject,
          html,
          text,
          purpose: "transactional",
          label: "contact-notification",
          idempotency_key: idempotencyKey,
          unsubscribe_token: "",
          queued_at: new Date().toISOString(),
        },
      });

      if (enqueueError) {
        console.error("Failed to enqueue contact notification email:", enqueueError);
        await supabase.from("email_send_log").insert({
          message_id: messageId,
          template_name: "contact-notification",
          recipient_email: NOTIFICATION_RECIPIENT,
          status: "failed",
          error_message: "Failed to enqueue email",
        });
      }
    } catch (emailErr) {
      console.error("Contact notification email error:", emailErr);
    }

    return { success: true };
  });
