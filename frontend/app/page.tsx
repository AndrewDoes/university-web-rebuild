import Image from "next/image";
import Hero from "./components/homepage/Hero";
import ProgramDetail from "./components/homepage/ProgramDetail";
import UnivValueSection from "./components/homepage/UnivValue";
import Testimonials from "./components/homepage/Testimonials";
import NewsMedia from "./components/homepage/FeaturedNews";
import EventsCarousel from "./components/homepage/Events";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background font-sans">
      <Hero />
      <ProgramDetail />
      <UnivValueSection />
      <Testimonials />
      <EventsCarousel />
      <NewsMedia />
    </div>
  );
}
