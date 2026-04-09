import Socials from "@/components/home/footer/Socials";
import Footer from "@/components/layout/footer/Footer";
import Navigation from "@/components/layout/navigation/Navigation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return <>
    <Navigation />
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2>Auth Page</h2>
    </div>
    <Footer>
      <Socials />
    </Footer>
  </>;
}
