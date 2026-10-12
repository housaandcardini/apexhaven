import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col w-full max-w-full overflow-x-clip">
      <TopBar />
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-clip">{children}</main>
      <Footer />
    </div>
  );
}
