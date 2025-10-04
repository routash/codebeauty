import { SubNavbar } from "@/components/navbar/sub-navbar";
import { DevelTool } from "@/components/sections/develtool";
import { NewFun } from "@/components/sections/newfun";
import { Popular } from "@/components/sections/popular";
import { TrendingTools } from "@/components/sections/trendingTools";
import { Welcome } from "@/components/sections/welcome";


export default function Home() {
  return (
    <main className="container mx-auto ">
       <SubNavbar />
       <Welcome />
      <Popular />
      <NewFun />
      <TrendingTools />
      <DevelTool
      />
    </main>
  );
}
