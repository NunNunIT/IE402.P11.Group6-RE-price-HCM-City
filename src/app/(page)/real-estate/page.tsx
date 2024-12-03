import { RealEstateCard } from "@/components/card";
import { SeeMoreType1 } from "@/components/seeMore";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] max-w-5xl mx-auto">
      <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <RealEstateCard key={index} />
        ))}
      </div>
      <SeeMoreType1 typeCard="news" title="Tin tức" />
    </div>
  );
}
