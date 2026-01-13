"use client"

interface RenderReportDataProps {
  data: any
}

export default function RenderReportData({ data }: RenderReportDataProps) {
  if (!data) {
    return <p className="text-gray-500 dark:text-gray-400 italic">No data available</p>
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <p className="text-gray-500 dark:text-gray-400 italic">No items</p>
    }

    return (
      <ul className="space-y-2">
        {data.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {idx + 1}
            </span>
            <span className="text-gray-900 dark:text-gray-100 pt-0.5">{renderValue(item)}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (typeof data === "object") {
    const entries = Object.entries(data).filter(([, v]) => v !== null && v !== undefined)

    if (entries.length === 0) {
      return <p className="text-gray-500 dark:text-gray-400 italic">No data available</p>
    }

    return (
      <div className="space-y-4">
        {entries.map(([key, value]) => (
          <div key={key} className="border-l-4 border-emerald-500 pl-4">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">{formatLabel(key)}</p>
            <div className="text-gray-900 dark:text-gray-100">
              {Array.isArray(value) ? (
                <ul className="space-y-1 ml-2">
                  {value.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                      <span>{renderValue(item)}</span>
                    </li>
                  ))}
                </ul>
              ) : typeof value === "object" ? (
                <RenderReportData data={value} />
              ) : (
                <p className="font-medium">{renderValue(value)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return <p className="text-gray-900 dark:text-gray-100 font-medium">{renderValue(data)}</p>
}

function renderValue(value: any): string {
  if (typeof value === "string") return value
  if (typeof value === "number") return value.toString()
  if (typeof value === "boolean") return value ? "Yes" : "No"
  if (value === null || value === undefined) return "—"
  return JSON.stringify(value)
}

function formatLabel(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/_/g, " ")
    .trim()
}
