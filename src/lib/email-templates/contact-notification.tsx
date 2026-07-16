import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  topic?: string;
  name?: string;
  org?: string;
  title?: string;
  phone?: string;
  email?: string;
  message?: string;
  submittedAt?: string;
}

const topicLabel: Record<string, string> = {
  b2b: "醫療機構與通路合作洽談",
  spec: "產品規格與專業資料索取",
  comwell: "康威爾 Comwell 居家照護諮詢",
};

const ContactNotification = ({
  topic = "b2b",
  name = "—",
  org = "",
  title = "",
  phone = "—",
  email = "—",
  message = "",
  submittedAt = "",
}: Props) => (
  <Html lang="zh-Hant" dir="ltr">
    <Head />
    <Preview>
      新的聯絡表單：{topicLabel[topic] ?? topic} — {name}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>上怡生醫｜新的聯絡表單</Heading>
        <Text style={subtitle}>類別：{topicLabel[topic] ?? topic}</Text>
        <Hr style={hr} />

        <Section>
          <Row k="姓名" v={name} />
          {org ? <Row k="單位 / 機構" v={org} /> : null}
          {title ? <Row k="職稱" v={title} /> : null}
          <Row k="電話" v={phone} />
          <Row k="Email" v={email} />
          {submittedAt ? <Row k="送出時間" v={submittedAt} /> : null}
        </Section>

        <Hr style={hr} />
        <Text style={label}>諮詢內容</Text>
        <Text style={messageBlock}>{message}</Text>

        <Hr style={hr} />
        <Text style={footer}>
          本信件由 shangyi-care.com 聯絡表單自動寄送。請於 1–2 個工作日內回覆客戶。
        </Text>
      </Container>
    </Body>
  </Html>
);

function Row({ k, v }: { k: string; v: string }) {
  return (
    <Text style={row}>
      <span style={rowKey}>{k}：</span>
      <span>{v}</span>
    </Text>
  );
}

export const template = {
  component: ContactNotification,
  subject: (data: Record<string, any>) =>
    `【聯絡表單】${topicLabel[data.topic as string] ?? "諮詢"} — ${data.name ?? ""}`,
  displayName: "聯絡表單通知",
  to: "shangyi@shangyi-care.com",
  previewData: {
    topic: "b2b",
    name: "王小明",
    org: "示範醫院",
    title: "採購專員",
    phone: "0912-345-678",
    email: "demo@example.com",
    message: "想了解 Comwell 間歇性氣動加壓器的合作方案。",
    submittedAt: "2026-07-16 17:00",
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "'Noto Sans TC', Arial, sans-serif" };
const container = { padding: "32px 28px", maxWidth: "600px" };
const h1 = { fontSize: "20px", color: "#0f172a", margin: "0 0 4px" };
const subtitle = { fontSize: "13px", color: "#64748b", margin: "0" };
const hr = { borderColor: "#e2e8f0", margin: "20px 0" };
const row = { fontSize: "14px", color: "#0f172a", margin: "6px 0", lineHeight: "1.6" };
const rowKey = { color: "#64748b", marginRight: "8px" };
const label = { fontSize: "12px", color: "#64748b", margin: "0 0 6px", letterSpacing: "0.05em" };
const messageBlock = {
  fontSize: "14px",
  color: "#0f172a",
  lineHeight: "1.7",
  whiteSpace: "pre-wrap" as const,
  backgroundColor: "#f8fafc",
  padding: "14px 16px",
  borderRadius: "6px",
};
const footer = { fontSize: "11px", color: "#94a3b8", margin: "0" };
