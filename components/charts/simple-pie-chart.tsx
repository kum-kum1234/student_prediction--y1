"use client"

interface SimplePieChartProps {
  data: Array<{ name: string; value: number; color: string }>
}

export function SimplePieChart({ data }: SimplePieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100
              const strokeDasharray = `${percentage} ${100 - percentage}`
              const strokeDashoffset = data
                .slice(0, index)
                .reduce((sum, prevItem) => sum + (prevItem.value / total) * 100, 0)
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="15.915"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={-strokeDashoffset}
                  className="transition-all duration-300"
                />
              )
            })}
          </svg>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <span className="text-sm text-gray-600">
              {item.value} ({((item.value / total) * 100).toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
