"use client"

import { X, Leaf, Zap, Target, Shield } from "lucide-react"

interface AboutProjectProps {
  onClose: () => void
}

export default function AboutProject({ onClose }: AboutProjectProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="glass-effect rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-green-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 dark:from-teal-500 dark:to-emerald-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Green Plant AI</h2>
          </div>

          <p className="text-foreground/80 leading-relaxed">
            An advanced AI-powered plant health analyzer that leverages cutting-edge computer vision and machine
            learning to diagnose plant diseases, nutritional deficiencies, and pest damage in real-time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-emerald-900/20 rounded-lg border border-green-200 dark:border-emerald-700">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-green-600 dark:text-teal-400" />
                <h3 className="font-semibold text-foreground">Instant Analysis</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Upload or capture an image for immediate AI-powered plant health diagnosis
              </p>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-teal-900/20 rounded-lg border border-emerald-200 dark:border-teal-700">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-emerald-600 dark:text-teal-400" />
                <h3 className="font-semibold text-foreground">Precision Detection</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Accurately identify diseases, deficiencies, and pest damage with high confidence
              </p>
            </div>

            <div className="p-4 bg-teal-50 dark:bg-cyan-900/20 rounded-lg border border-teal-200 dark:border-cyan-700">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
                <h3 className="font-semibold text-foreground">Smart Solutions</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Get organic and chemical treatment recommendations tailored to your plant
              </p>
            </div>

            <div className="p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg border border-lime-200 dark:border-lime-700">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                <h3 className="font-semibold text-foreground">Preventive Care</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Learn preventive measures to keep your plants healthy and thriving
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-foreground/60">
              <strong>How it works:</strong> Simply upload or take a photo of your plant leaf. Our advanced AI model
              analyzes the image to detect any health issues and provides comprehensive recommendations for treatment
              and prevention.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-teal-500 dark:to-emerald-500 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 dark:hover:from-teal-600 dark:hover:to-emerald-600 transition-colors font-semibold"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
