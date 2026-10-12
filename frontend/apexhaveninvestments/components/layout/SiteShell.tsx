import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
