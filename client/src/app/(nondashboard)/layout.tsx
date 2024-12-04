import NonDashboardNavBar from "@/components/nonDashbordNavBar";
import Landing from "@/app/(nondashboard)/landing/page";
import Footer from "@/components/footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavBar />
      <main className="nondashboard-layout__main">{children}</main>
      <Footer />
    </div>
  );
}
