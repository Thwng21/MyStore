import Image from "next/image";
import Navbar from "@/components/Navbar";
import SlideSection from "@/components/SlideSection";
import AboutSection from "@/components/AboutSection";
import SendInfomationSection from "@/components/SendInfomationSection";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
export default function Home() {
  return (
    <div className="mx-auto p-4">
      <Navbar />
      <SlideSection />
      <AboutSection />
      <SendInfomationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
