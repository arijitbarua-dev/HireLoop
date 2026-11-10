import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Navbar />
        {children}
        <Footer />
      </main>
    </div>
  );
}