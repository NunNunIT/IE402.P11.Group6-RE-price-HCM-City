"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
const LocationSelector = dynamic(() => import('@/components/VNLocationSelector'), { loading: () => <p>Loading...</p> });

export default function ExamplePage() {
  const [location, setLocation] = useState({
    province: null,
    district: null,
    ward: null,
    wardId: null,
    street: null,
  });
  useEffect(() => {
    toast.info("location", {
      description: (
        <pre>
          {JSON.stringify(location, null, 2)}
        </pre>
      )
    })
  }, [location])

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex justify-between items-center sticky top-0 bg-background p-2 py-8 w-full max-w-4xl mx-4 z-50">
        <h1 className="text-3xl font-bold">Example Page</h1>
      </div>

      <div className="w-full max-w-4xl space-y-8 m-4">
        <LocationSelector value={location} onChange={setLocation} />
      </div>
    </main>
  );
}
