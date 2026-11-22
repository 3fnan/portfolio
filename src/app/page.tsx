import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import WhyMe from "@/components/WhyMe";
import Toolkit from "@/components/Toolkit";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HireMe from "@/components/HireMe";
import ScrollHud from "@/components/ScrollHud";
import SectionFrame from "@/components/SectionFrame";
import StoryMain from "@/components/StoryMain";
import Intro from "@/components/Intro";

export default function Home() {
  return (
    <>
      <Intro />
      <Navbar />
      <HireMe />
      <ScrollHud />
      <Hero />
      {/* Everything below slides up over the sticky hero, as one continuous story */}
      <StoryMain>
        <SectionFrame name="clients"><Brands /></SectionFrame>
        <SectionFrame name="about"><About /></SectionFrame>
        <SectionFrame name="skills"><Services /></SectionFrame>
        <SectionFrame name="projects"><Projects /></SectionFrame>
        <SectionFrame name="journey"><Experience /></SectionFrame>
        <SectionFrame name="highlights"><WhyMe /></SectionFrame>
        <SectionFrame name="toolkit"><Toolkit /></SectionFrame>
        <SectionFrame name="contact"><Contact /></SectionFrame>
      </StoryMain>
      <Footer />
    </>
  );
}
