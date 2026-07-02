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

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} 上怡生技醫藥有限公司 SHANG YI BIOPHARMA　保留所有權利</p>
          <p className="tracking-wider">
            醫療器材販賣業許可執照
          </p>
        </div>
      </div>
    </footer>
  );
}
