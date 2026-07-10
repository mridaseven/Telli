import DesktopHome from "@/components/desktop/DesktopHome";
import MobileHome from "@/components/mobile/MobileHome";

export default function HomePage() {
  return (
    <>
      <div className="desktop-only">
        <DesktopHome />
      </div>
      <div className="mobile-only">
        <MobileHome />
      </div>
    </>
  );
}
