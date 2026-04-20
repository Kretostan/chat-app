import AuthPhoto from "@/assets/auth.png";
import { useMobile } from "@/hooks";

const Photo = () => {
  const isMobile = useMobile();
  return !isMobile && <div className="rounded-2xl overflow-hidden outline-2 outline-tertiary">
    <img src={AuthPhoto} width={600} />
  </div>
}

export default Photo;
