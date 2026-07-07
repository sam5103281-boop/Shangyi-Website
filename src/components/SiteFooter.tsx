import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface-muted">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold text-foreground">上怡生技醫藥有限公司</span>
              <span className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                SHANG YI BIOPHARMA
              </span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              以合規品質為核心，鏈結臨床與居家照護的生醫專家。代理與經銷符合國際法規的醫療器材、特殊機能保健品與護理耗材。
            </p>

            <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
              <div className="rounded-xl border border-hairline bg-white/60 px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">License</div>
                <div className="mt-1 text-sm font-medium text-foreground">醫療器材販賣業</div>
                <div className="text-[11px] text-muted-foreground">南市醫器販 字第 MD6205034486 號</div>
              </div>
              <div className="rounded-xl border border-hairline bg-white/60 px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Quality</div>
                <div className="mt-1 text-sm font-medium text-foreground">符合國際法規</div>
                <div className="text-[11px] text-muted-foreground">TFDA · ISO 標準</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              網站導覽
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground whitespace-nowrap">首頁</Link></li>
              <li><Link to="/about" className="hover:text-foreground whitespace-nowrap">關於上怡</Link></li>
              <li><Link to="/products" className="hover:text-foreground whitespace-nowrap">產品中心</Link></li>
              <li><Link to="/education" className="hover:text-foreground whitespace-nowrap">醫療保健專欄</Link></li>
              <li><Link to="/care" className="hover:text-foreground whitespace-nowrap">下肢循環照護</Link></li>
              <li><Link to="/channels" className="hover:text-foreground whitespace-nowrap">專業通路</Link></li>
              <li><Link to="/contact" className="hover:text-foreground whitespace-nowrap">聯絡我們</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              聯絡資訊
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="block text-foreground">公司地址</span>
                臺南市南區新昌里國華街一段 98 號
              </li>
              <li>
                <span className="block text-foreground">電話／傳真</span>
                TEL：06-222-0070　FAX：06-222-0050
              </li>
              <li>
                <span className="block text-foreground">免付費客服</span>
                0800-222-215
              </li>
              <li>
                <span className="block text-foreground">Email</span>
                <a href="mailto:shangyi@shangyi-care.com" className="hover:text-foreground">
                  shangyi@shangyi-care.com
                </a>
              </li>
              <li>
                <span className="block text-foreground">服務時間</span>
                週一至週五 09:00 – 18:00
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline-divider mt-14" />

        <div className="mt-6 flex flex-col justify-between gap-4 text-xs text-muted-foreground md:flex-row md:items-center">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
            <p>© {new Date().getFullYear()} 上怡生技醫藥有限公司 SHANG YI BIOPHARMA　保留所有權利</p>
            <p className="tracking-wider">
              醫療器材販賣業許可執照
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://line.me/ti/p/@shangyi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LINE"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-surface text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.03 2 10.82c0 2.58 1.21 4.93 3.17 6.63l.01 2.57c0 .31.37.49.62.29l2.34-1.95c.97.26 1.99.41 3.05.41 5.52 0 10-4.03 10-8.82S17.52 2 12 2zm4.94 8.34h-1.22c-.17 0-.31.14-.31.31v3.1c0 .17.14.31.31.31h1.22c.17 0 .31-.14.31-.31v-3.1a.31.31 0 0 0-.31-.31zM8.34 9.65h1.22c.17 0 .31.14.31.31v1.35h1.44V9.96c0-.17.14-.31.31-.31h1.22c.17 0 .31.14.31.31v3.1c0 .17-.14.31-.31.31h-1.22a.31.31 0 0 1-.31-.31v-1.35H9.88v1.35c0 .17-.14.31-.31.31H8.34a.31.31 0 0 1-.31-.31v-3.1c0-.17.14-.31.31-.31zm7.78 0h1.22c.17 0 .31.14.31.31v3.1c0 .17-.14.31-.31.31h-1.22a.31.31 0 0 1-.31-.31v-3.1c0-.17.14-.31.31-.31z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/shangyi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-surface text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@shangyi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-surface text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
