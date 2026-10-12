import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-ink">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you are looking for does not exist or has moved.</p>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </section>
  );
}
