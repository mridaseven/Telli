import DesktopSelect from "@/components/desktop/DesktopSelect";
import MobileSelectWizard from "@/components/mobile/MobileSelectWizard";

export default function SelectPage() {
  return (
    <>
      <div className="desktop-only">
        <DesktopSelect />
      </div>
      <div className="mobile-only">
        <MobileSelectWizard />
      </div>
    </>
  );
}
