"use client"

export default function AnimatedBackground() {
  const leaves = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 6 + Math.random() * 4,
    delay: Math.random() * 2,
    size: 20 + Math.random() * 40,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 dark:bg-teal-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-300 dark:bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow" />

      {/* Animated leaf particles */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute text-green-600 dark:text-teal-400 opacity-30 animate-float"
          style={{
            left: `${leaf.left}%`,
            top: "-50px",
            fontSize: `${leaf.size}px`,
            animation: `float ${leaf.duration}s ease-in-out infinite`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          🍃
        </div>
      ))}
    </div>
  )
}
