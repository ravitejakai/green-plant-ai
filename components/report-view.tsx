"use client"

import { Plus, Download, Printer, X } from "lucide-react"
import { useState } from "react"
import ReportSection from "./report-section"
import RenderReportData from "./render-report-data" // Import the missing component

interface AnalysisResult {
  [key: string]: any
}

interface ReportViewProps {
  result: AnalysisResult
  imagePreview?: string | null
  onNewAnalysis: () => void
  onDownloadPDF: () => void
  onPrintReport: () => void
}

export default function ReportView({
  result,
  imagePreview,
  onNewAnalysis,
  onDownloadPDF,
  onPrintReport,
}: ReportViewProps) {
  const [showInfo, setShowInfo] = useState(false)
  const [expandedImage, setExpandedImage] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="no-print glass-card rounded-2xl p-6 border sticky top-20 z-40 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={onNewAnalysis}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 hover:from-emerald-700 hover:to-teal-700 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white dark:text-slate-900 rounded-lg transition-all font-semibold transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            New Analysis
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 hover:from-blue-700 hover:to-cyan-700 dark:hover:from-blue-600 dark:hover:to-cyan-600 text-white dark:text-slate-900 rounded-lg transition-all font-semibold"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>

            <button
              onClick={onPrintReport}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-gray-600 dark:from-slate-500 dark:to-gray-500 hover:from-slate-700 hover:to-gray-700 dark:hover:from-slate-600 dark:hover:to-gray-600 text-white dark:text-slate-900 rounded-lg transition-all font-semibold"
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="glass-card rounded-2xl p-6 border overflow-hidden">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Analyzed Image</h3>
          <div className="relative cursor-pointer group" onClick={() => setExpandedImage(!expandedImage)}>
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Plant analyzed"
              className="w-full max-h-96 object-cover rounded-xl border border-gray-200 dark:border-gray-700 group-hover:shadow-lg transition-all"
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">Click to expand</p>
          </div>
        </div>
      )}

      {/* Expanded Image Modal */}
      {expandedImage && imagePreview && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setExpandedImage(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setExpandedImage(false)}
              className="absolute -top-12 right-0 p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Plant analyzed - expanded"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Report Content */}
      <div className="space-y-6">
        {Object.entries(result).map(([key, value]) => {
          // Skip technical/metadata fields
          if (!value || typeof value === "string" || typeof value === "number") {
            if (key === "summary" && typeof value === "string") {
              return (
                <ReportSection key={key} title="Summary">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 dark:border-emerald-400 p-4 rounded">
                    <p className="text-gray-900 dark:text-gray-100 leading-relaxed">{value}</p>
                  </div>
                </ReportSection>
              )
            }
            return null
          }

          if (typeof value === "object" && value !== null) {
            return (
              <ReportSection key={key} title={formatTitle(key)}>
                <RenderReportData data={value} />
              </ReportSection>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}

function formatTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}
