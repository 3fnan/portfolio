import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import WhyMe from "@/components/WhyMe";
import Showcase from "@/components/Showcase";
import Toolkit from "@/components/Toolkit";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HireMe from "@/components/HireMe";

export default function Home() {
  return (
    <>
      <Navbar />
      <HireMe />
      <Hero />
      {/* Everything below slides up over the sticky hero */}
      <main className="relative z-10 bg-paper">
        <Brands />
        <About />
        <Services />
        <Projects />
        <Experience />
        <WhyMe />
        <Showcase />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
