import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Cta from "@/components/home/cta/Cta";
import Features from "@/components/home/features/Features";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/stats/Stats";
import Navigation from "@/components/layout/navigation/Navigation";
import Footer from "@/components/layout/footer/Footer";
import { useMobile } from "@/hooks";
import List from "@/components/home/navigation/List";
import MobileList from "@/components/home/navigation/MobileList";
import PrimaryButton from "@/components/layout/navigation/PrimaryButton";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const isMobile = useMobile();
  const navigate = useNavigate({ from: "/" });
  return (
    <>
      <Navigation>
        {isMobile ? <MobileList /> : <List />}
        <PrimaryButton onClick={() => navigate({ to: "/auth" })}>Go in</PrimaryButton>
      </Navigation>
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
