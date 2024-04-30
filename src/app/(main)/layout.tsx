import { MobileHeader } from "@/components/mobile-header";
import { SideBar } from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <SideBar className="hidden lg:flex" />
      <main className="h-full  pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1065px] pt-6">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
