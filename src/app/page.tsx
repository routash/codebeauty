import { SubNavbar } from "@/components/navbar/sub-navbar";
import { DevelTool } from "@/components/sections/develtool";
import { NewFun } from "@/components/sections/newfun";
import { Popular } from "@/components/sections/popular";
import { TrendingTools } from "@/components/sections/trendingTools";
import { QRGenerator } from "@/components/sections/qrGenerator";
import { BackgroundRemover } from "@/components/sections/background-remover";
import WelcomePage from "@/components/ui/welcome-Page"; // ✅ Fixed import

export default function Home() {
  return (
    <main className="container mx-auto">
      <SubNavbar />
      <WelcomePage /> {/* ✅ Correct name */}
      <Popular />
      <NewFun />
      <TrendingTools />
      <DevelTool />
    </main>
  );
}
