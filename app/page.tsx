"use client"

import { useState, useRef, useEffect } from "react"
import { Leaf, Sparkles, Target, Sprout, Eye, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import ImageUploadModal from "@/components/image-upload-modal"
import LoadingState from "@/components/loading-state"
import ReportView from "@/components/report-view"
import ErrorAlert from "@/components/error-alert"
import AnimatedBackground from "@/components/animated-background"

interface AnalysisResult {
  [key: string]: any
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(savedMode)
    if (savedMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("darkMode", String(newMode))
    if (newMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleFileSelected = (file: File) => {
    setSelectedImage(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    setShowUploadModal(false)
    analyzeImage(file)
  }

  const analyzeImage = async (file: File) => {
    if (!file) {
      setError("Please select or capture an image to continue.")
      return
    }

    setLoading(true)
    setError(null)
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) return prev + 5
        if (prev < 65) return prev + 3
        if (prev < 90) return prev + 2
        return prev
      })
    }, 300)

    try {
      const reader = new FileReader()

      reader.onload = async () => {
        const base64String = reader.result as string

        try {
          console.log("[v0] Sending image to n8n webhook...")

          const formData = new FormData()
          formData.append("file", file)
          formData.append("filename", file.name)

          const response = await fetch("https://rtai1.onrender.com/webhook-test/image-pick", {
            method: "POST",
            body: formData,
            // Don't set Content-Type header - browser will set it automatically with boundary
          })

          clearInterval(progressInterval)
          console.log("[v0] Response status:", response.status)

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()
          console.log("[v0] Response data:", JSON.stringify(data, null, 2))

          setProgress(100)

          if (!data || typeof data !== "object") {
            setError("Analysis completed, but report data is incomplete. Please try again.")
            setLoading(false)
            return
          }

          setAnalysisResult(data)
          setLoading(false)
        } catch (err) {
          clearInterval(progressInterval)
          const errorMessage = err instanceof Error ? err.message : "Unknown error"
          console.log("[v0] Error:", errorMessage)

          setError("Unable to analyze the image. Please check your connection and try again.")
          setLoading(false)
        }
      }

      reader.onerror = () => {
        clearInterval(progressInterval)
        setError("Failed to read the image file. Please try again.")
        setLoading(false)
      }

      reader.readAsDataURL(file)
    } catch (err) {
      clearInterval(progressInterval)
      setError("An error occurred while analyzing the image. Please try again.")
      setLoading(false)
    }
  }

  const handleNewAnalysis = () => {
    if (analysisResult) {
      const confirmed = window.confirm(
        "Starting a new analysis will remove the current report. Please download or print it first.",
      )
      if (!confirmed) return
    }
    setAnalysisResult(null)
    setSelectedImage(null)
    setSelectedImagePreview(null)
    setProgress(0)
    setError(null)
    setShowUploadModal(true)
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white via-sky-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500 overflow-hidden">
      <AnimatedBackground />

      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="relative z-10">
        {error && (
          <ErrorAlert
            message={error}
            onRetry={() => {
              setError(null)
              if (selectedImage) {
                analyzeImage(selectedImage)
              }
            }}
            onDismiss={() => setError(null)}
          />
        )}

        {loading && <LoadingState progress={progress} />}

        {analysisResult && !loading && (
          <ReportView
            result={analysisResult}
            imagePreview={selectedImagePreview}
            onNewAnalysis={handleNewAnalysis}
            onDownloadPDF={() => window.print()}
            onPrintReport={() => window.print()}
          />
        )}

        {!analysisResult && !loading && (
          <>
            {/* Premium Hero Section */}
            <section className="container mx-auto px-4 py-20 max-w-6xl">
              {/* Main Hero */}
              <div className="text-center mb-20 animate-fade-in">
                <div className="inline-block mb-6 px-4 py-2 glass-effect rounded-full border border-emerald-200 dark:border-emerald-500/30">
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    AI-Powered Plant Intelligence
                  </p>
                </div>

                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Plant AI
                  </span>
                </h1>

                <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  AI-powered Plant Health Analyzer
                </p>

                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                  An advanced AI-powered plant health analyzer that leverages cutting-edge computer vision and machine
                  learning to diagnose plant diseases, nutritional deficiencies, and pest damage in real-time.
                </p>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-slide-in-up">
                <button
                  onClick={handleNewAnalysis}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 text-white dark:text-slate-900 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 animate-float" />
                  Start Analysis
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-20">
                {[
                  {
                    icon: Eye,
                    title: "Instant Analysis",
                    desc: "Upload or capture an image for immediate AI-powered plant health diagnosis",
                    delay: "0ms",
                    color: "from-emerald-50 dark:from-emerald-900/30 border-emerald-200 dark:border-emerald-700",
                  },
                  {
                    icon: Target,
                    title: "Precision Detection",
                    desc: "Accurately identify diseases, deficiencies, and pest damage with high confidence",
                    delay: "100ms",
                    color: "from-teal-50 dark:from-teal-900/30 border-teal-200 dark:border-teal-700",
                  },
                  {
                    icon: Leaf,
                    title: "Smart Solutions",
                    desc: "Get organic and chemical treatment recommendations tailored to your plant",
                    delay: "200ms",
                    color: "from-cyan-50 dark:from-cyan-900/30 border-cyan-200 dark:border-cyan-700",
                  },
                  {
                    icon: Sprout,
                    title: "Preventive Care",
                    desc: "Learn preventive measures to keep your plants healthy and thriving",
                    delay: "300ms",
                    color: "from-blue-50 dark:from-blue-900/30 border-blue-200 dark:border-blue-700",
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className={`glass-card rounded-2xl p-8 border bg-gradient-to-br ${feature.color} hover:shadow-lg transition-all duration-300 animate-slide-in-up`}
                    style={{ animationDelay: feature.delay }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/50 dark:bg-slate-800/50 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* How It Works */}
              <div className="glass-card rounded-2xl p-12 border bg-gradient-to-br from-slate-50 dark:from-slate-900/50 border-gray-200 dark:border-gray-700 mb-20 animate-fade-in">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">How It Works</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  Simply upload or take a photo of your plant leaf. Our advanced AI model analyzes the image to detect
                  any health issues and provides comprehensive recommendations for treatment and prevention.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "1. Upload or Capture Image",
                    "2. AI Analysis in Progress",
                    "3. Get Detailed Report",
                    "4. Take Action",
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center"
                    >
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <ImageUploadModal
          onFileSelected={handleFileSelected}
          onClose={() => setShowUploadModal(false)}
          fileInputRef={fileInputRef}
          cameraInputRef={cameraInputRef}
        />
      )}

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileSelected(e.target.files[0])
          }
        }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileSelected(e.target.files[0])
          }
        }}
      />
    </div>
  )
}
