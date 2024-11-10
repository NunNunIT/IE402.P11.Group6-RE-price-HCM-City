import dynamic from "next/dynamic";

// import { GISMap } from "@/components";
const GISMap = dynamic(() => import("@/components").then((mod) => mod.GISMap),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh]">
      <GISMap className="container" />
    </div>
  );
}
