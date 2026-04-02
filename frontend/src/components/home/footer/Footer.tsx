import Copyright from "./Copyright";
import FooterItem from "./FooterItem";
import Socials from "./Socials";

const Footer = () => {
  return (
    <section
      id="contact"
      className="flex flex-col items-center gap-8 scroll-mt-20 pt-12 px-6 bg-[#0d0d0d] text-foreground-secondary"
    >
      <h4 className="text-3xl text-primary font-semibold">ChatApp</h4>
      <p className="">Modern communication for modern teams</p>
      <ul className="flex flex-col sm:flex-row items-center gap-4 text-sm">
        <FooterItem>Features</FooterItem>
        <FooterItem>Pricing</FooterItem>
        <FooterItem>About</FooterItem>
        <FooterItem>Contact</FooterItem>
        <FooterItem>Privacy</FooterItem>
        <FooterItem>Terms</FooterItem>
      </ul>
      <Socials />
      <Copyright />
    </section>
  );
};

export default Footer;
