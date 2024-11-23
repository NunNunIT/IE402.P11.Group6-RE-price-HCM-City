"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeTextProps {
  children: string
  className?: string
}

const CodeText: React.FC<CodeTextProps> = ({ children, className }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={cn("relative group", className)}>
      <pre className="p-4 bg-primary text-muted rounded-md overflow-x-auto pr-[3.25rem]">
        <code>{children}</code>
      </pre>
      <Button
        onClick={handleCopy}
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={copied ? "Copied" : "Copy to clipboard"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  )
}

export default CodeText
