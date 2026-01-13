"use client"

import { Leaf } from "lucide-react"

export default function LoadingState({ progress }: { progress: number }) {
  const getProgressLabel = (value: number) => {
    if (value < 30) return "Preprocessing image"
    if (value < 65) return "Analyzing plant health"
    if (value < 90) return "Generating recommendations"
    return "Finalizing report"
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] gap-12 px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 mb-6 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 dark:from-emerald-500/10 dark:to-cyan-500/10 animate-pulse"></div>
          <Leaf className="w-12 h-12 text-emerald-600 dark:text-emerald-400 animate-float" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Analyzing Your Plant</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">Our AI is examining the leaf closely...</p>
      </div>

      {/* Progress Section */}
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{getProgressLabel(progress)}</span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-400 transition-all duration-300 rounded-full shadow-lg"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Tips */}
      <div className="glass-card rounded-xl p-6 max-w-md border text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          💡 Tip: Ensure the plant leaf is well-lit and fills most of the frame for best accuracy
        </p>
      </div>
    </div>
  )
}
