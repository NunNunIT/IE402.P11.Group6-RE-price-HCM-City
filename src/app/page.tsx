import dynamic from "next/dynamic";

// import { GISMap } from "@/components";
const GISMap = dynamic(() => import("@/components").then((mod) => mod.GISMap),
  { ssr: false }
);

export default function Home() {
  return (
    <GISMap />
  );
}
