"use client"

import { Sun, Moon, Leaf } from "lucide-react"

interface HeaderProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export default function Header({ isDarkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 glass-card animate-slide-in-down no-print">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 rounded-xl blur-md opacity-75"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-white dark:text-slate-900" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Green Plant AI
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">AI Plant Health Analyzer</p>
          </div>
        </div>

        <button
          onClick={onToggleDarkMode}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 transform hover:scale-110"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-yellow-500 animate-float" />
          ) : (
            <Moon className="w-6 h-6 text-slate-700" />
          )}
        </button>
      </div>
    </header>
  )
}
