"use client"

import { AlertTriangle, X } from "lucide-react"

interface ErrorAlertProps {
  message: string
  onRetry?: () => void
  onDismiss: () => void
}

export default function ErrorAlert({ message, onRetry, onDismiss }: ErrorAlertProps) {
  return (
    <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-900 dark:text-red-50">{message}</p>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-50 flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white rounded transition-colors"
        >
          Retry Analysis
        </button>
      )}
    </div>
  )
}
