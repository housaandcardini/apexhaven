import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";

export const metadata = {
  title: "Payment and Quotation Terms | Apex Haven Investments",
  description: "Terms governing M-Pesa, card transactions, invoices, and quotation milestones for Apex Haven Investments Limited.",
};

export default function PaymentTermsPage() {
  return (
    <InnerPage
      crumb="Payment Terms"
      title="Payment and Quotation Terms"
      description="Transparent rules governing payment processing, transaction verification, M-Pesa channels, quotation validity, and invoice milestones."
      image={images.luxuryHouse}
      cta={false}
    >
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-charcoal leading-relaxed space-y-8">
        <div>
          <h2 className="text-xl font-bold font-display text-forest">1. Accepted Payment Methods</h2>
          <p className="mt-2 text-sm text-slate-700">
            Apex Haven Investments Limited accepts payments exclusively through secure, authenticated channels suitable for Kenyan and diaspora clients:
          </p>
          <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1">
            <li><strong>M-Pesa:</strong> Automated STK Push prompts and Paybill (Business Number 247247, Account: APEX HAVEN).</li>
            <li><strong>Debit &amp; Credit Cards:</strong> Visa and Mastercard processed via certified 256-bit encrypted gateway.</li>
            <li><strong>Bank Wire Transfer (EFT / RTGS / SWIFT):</strong> Available for high-value milestone invoices upon request.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">2. Authenticated Verification Standard</h2>
          <p className="mt-2 text-sm text-slate-700">
            To prevent fraud and protect consumer rights, orders are confirmed only upon cryptographic or API verification with the payment provider. We do not validate transactions solely on customer screenshots or unverified redirects.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">3. Currency &amp; Statutory Taxation</h2>
          <p className="mt-2 text-sm text-slate-700">
            All prices and quotations are denominated in Kenya Shillings (KES / KSh). Unless explicitly stated otherwise on quotation proposals, fees are inclusive of statutory taxes. Every verified payment generates an official tax invoice and unique transaction reference.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">4. Quotation Validity &amp; Milestone Invoices</h2>
          <p className="mt-2 text-sm text-slate-700">
            Written quotations issued for project procurement, turnkey fit-outs, or fine art commissions remain valid for <strong>14 calendar days</strong> from the date of issue. Due to fluctuating commodity and raw material costs (e.g. global steel and fuel prices), procurement prices are subject to reconfirmation after the expiry period.
          </p>
        </div>
      </div>
    </InnerPage>
  );
}
