import { createFileRoute } from "@tanstack/react-router";
import Cta from "@/components/home/cta/Cta";
import Features from "@/components/home/features/Features";
import Footer from "@/components/home/footer/Footer";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/stats/Stats";
import Navigation from "@/components/layout/navigation/Navigation";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navigation />
      <Hero />
      <main className="flex flex-col justify-center items-center">
        <Features />
        <Stats />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
