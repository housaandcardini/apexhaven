import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";

export const metadata = {
  title: "Privacy Policy | Apex Haven Investments",
  description: "Privacy Policy compliant with the Kenya Data Protection Act 2019.",
};

export default function PrivacyPage() {
  return (
    <InnerPage
      crumb="Privacy Policy"
      title="Privacy Policy"
      description="How Apex Haven Investments Limited collects, handles, and protects personal data in compliance with the Kenya Data Protection Act, 2019."
      image={images.luxuryHouse}
      cta={false}
    >
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-charcoal leading-relaxed space-y-8">
        <div>
          <h2 className="text-xl font-bold font-display text-forest">1. Commitment to Data Protection</h2>
          <p className="mt-2 text-sm text-slate-700">
            Apex Haven Investments Limited respects your fundamental right to privacy. We process personal data strictly in compliance with the <strong>Kenya Data Protection Act, 2019</strong> and its implementing regulations.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">2. Personal Data We Collect</h2>
          <p className="mt-2 text-sm text-slate-700">
            We collect only personal data necessary to provide and manage our services, including:
          </p>
          <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1">
            <li><strong>Contact details:</strong> Full name, telephone/M-Pesa number, and email address.</li>
            <li><strong>Project criteria:</strong> Property preferences, budget allocations, spatial dimensions, material schedules, and architectural briefs.</li>
            <li><strong>Transaction records:</strong> Order numbers, payment references, and tax invoice metadata. (Card security codes are never stored on our servers).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">3. Lawful Purpose of Processing</h2>
          <p className="mt-2 text-sm text-slate-700">
            Your data is processed strictly for: (a) fulfilling service packages and issuing deliverables, (b) processing and reconciling online payments, (c) issuing official receipts and statutory tax documentation, and (d) communicating project updates. We never sell, rent, or trade your data to third-party marketing companies.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">4. Data Security &amp; Retention</h2>
          <p className="mt-2 text-sm text-slate-700">
            We implement administrative, technical, and physical safeguards to protect your personal information against unauthorized access, loss, or alteration. Data is retained only for as long as necessary to fulfill the service purpose and satisfy Kenyan statutory accounting and tax retention obligations.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">5. Your Statutory Rights</h2>
          <p className="mt-2 text-sm text-slate-700">
            Under the Kenya Data Protection Act, 2019, you have the right to request access to your personal data, seek rectification of inaccurate information, or request erasure where processing is no longer required. Contact our Data Protection Officer at <strong>privacy@apexhaveninvestments.com</strong>.
          </p>
        </div>
      </div>
    </InnerPage>
  );
}
