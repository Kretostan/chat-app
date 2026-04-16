import Socials from "@/components/home/footer/Socials";
import Footer from "@/components/layout/footer/Footer";
import Navigation from "@/components/layout/navigation/Navigation";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute('/auth')({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/auth") {
      throw redirect({
        to: "/auth/login",
        replace: true
      });
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return <>
    <Navigation />
    <Outlet />
    <Footer>
      <Socials />
    </Footer>
  </>;
}
