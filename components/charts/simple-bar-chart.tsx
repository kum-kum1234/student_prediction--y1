"use client"

interface SimpleBarChartProps {
  data: Array<{ name: string; value: number; max: number }>
}

export function SimpleBarChart({ data }: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{item.name}</span>
            <span className="text-gray-600">{item.value.toFixed(1)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(item.value / 100) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
