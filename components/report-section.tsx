import type React from "react"
interface ReportSectionProps {
  title: string
  children: React.ReactNode
}

export default function ReportSection({ title, children }: ReportSectionProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-primary mb-4 print-green-header">{title}</h2>
      {children}
    </div>
  )
}
