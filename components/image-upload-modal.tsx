"use client"

import { Camera, Upload, X } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import type { RefObject } from "react"

interface ImageUploadModalProps {
  onFileSelected: (file: File) => void
  onClose: () => void
  fileInputRef: RefObject<HTMLInputElement>
  cameraInputRef: RefObject<HTMLInputElement>
}

export default function ImageUploadModal({
  onFileSelected,
  onClose,
  fileInputRef,
  cameraInputRef,
}: ImageUploadModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [useCamera, setUseCamera] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Camera access error:", err)
      setError("Camera access denied. Please allow camera permission in your browser settings.")
      setUseCamera(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setCameraActive(false)
    }
  }

  useEffect(() => {
    if (useCamera && !cameraActive) {
      startCamera()
    }
    return () => {
      if (useCamera) {
        stopCamera()
      }
    }
  }, [useCamera, cameraActive])

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "plant-capture.jpg", { type: "image/jpeg" })
            stopCamera()
            setUseCamera(false)
            onFileSelected(file)
          }
        }, "image/jpeg")
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md animate-scale-in">
      <div className="glass-card rounded-2xl shadow-2xl max-w-md w-full p-8 relative border">
        <button
          onClick={() => {
            stopCamera()
            onClose()
          }}
          className="absolute top-6 right-6 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {!useCamera ? (
          <>
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Analyze Your Plant</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Choose how to capture your plant image</p>

            <div className="space-y-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/60 dark:hover:to-teal-900/60 text-emerald-900 dark:text-emerald-100 rounded-xl transition-all duration-200 border-2 border-emerald-300 dark:border-emerald-600 hover:shadow-lg hover:scale-105 transform font-semibold"
              >
                <Upload className="w-6 h-6" />
                <div className="text-left">
                  <p>Upload Image</p>
                  <p className="text-sm opacity-75">From your device</p>
                </div>
              </button>

              <button
                onClick={() => setUseCamera(true)}
                className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/40 dark:to-blue-900/40 hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-900/60 dark:hover:to-blue-900/60 text-cyan-900 dark:text-cyan-100 rounded-xl transition-all duration-200 border-2 border-cyan-300 dark:border-cyan-600 hover:shadow-lg hover:scale-105 transform font-semibold"
              >
                <Camera className="w-6 h-6" />
                <div className="text-left">
                  <p>Use Camera</p>
                  <p className="text-sm opacity-75">Capture in real-time</p>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Capture Plant Image</h2>

            {/* Camera Feed */}
            <div className="relative bg-black rounded-xl overflow-hidden mb-6 aspect-video border-2 border-gray-700">
              {cameraActive ? (
                <>
                  <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                  <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-xl pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-emerald-500 rounded-full opacity-50"></div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-400">Camera loading...</p>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-900 dark:text-red-100">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  stopCamera()
                  setUseCamera(false)
                  setError(null)
                }}
                className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
              >
                Back
              </button>
              <button
                onClick={capturePhoto}
                disabled={!cameraActive}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 hover:from-emerald-700 hover:to-teal-700 dark:hover:from-emerald-600 dark:hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white dark:text-slate-900 rounded-lg transition-all font-semibold"
              >
                <Camera className="w-5 h-5" />
                Capture Photo
              </button>
            </div>
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
