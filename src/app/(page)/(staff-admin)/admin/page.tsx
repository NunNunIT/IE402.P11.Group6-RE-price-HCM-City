"use client";

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ITEMS } from '@/partial/sidebar'

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh]">
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.slice(1).map((item, index) => (
            <Link key={index} href={item.url}>
              <Card className="flex flex-col rounded-lg shadow-md p-6 aspect-square items-center justify-center gap-4">
                <item.icon className="size-20 opacity-75" />
                <h2 className="text-lg font-semibold">{item.title}</h2>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
