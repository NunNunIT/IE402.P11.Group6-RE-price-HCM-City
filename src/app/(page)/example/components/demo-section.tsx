import Link from "next/link";

interface IDemoSectionProps {
  title: string;
  children: React.ReactNode;
  href: string;
}

export default function DemoSection({ title, children, href }: IDemoSectionProps) {
  return (
    <section className="space-y-4 bg-zinc-50 dark:bg-black p-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
      <Link
        href={href}
        className="inline-flex items-center hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >Read docs</Link>
    </section>
  )
}