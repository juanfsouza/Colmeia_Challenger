interface WaveSeparatorProps {
  className?: string
  fillColor?: string
  height?: number
}

export function WaveSeparator({ 
  className = "", 
  fillColor = "#1f2937", // gray-800
  height = 120 
}: WaveSeparatorProps) {
  return (
    <div className={`relative w-full bg-yellow-100/50 ${className}`} style={{ height: `${height}px` }}>
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox={`0 0 1200 ${height}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef3c7" /> {/* amber-100 */}
            <stop offset="50%" stopColor="#fed7aa" /> {/* orange-200 */}
            <stop offset="100%" stopColor="#1f2937" /> {/* gray-800 */}
          </linearGradient>
        </defs>
        
        {/* Primeira onda */}
        <path
          d={`M0,${height * 0.3} C300,${height * 0.1} 600,${height * 0.5} 900,${height * 0.3} C1050,${height * 0.2} 1200,${height * 0.4} 1200,${height * 0.3} L1200,${height} L0,${height} Z`}
          fill="url(#waveGradient)"
        />
        
        {/* Segunda onda */}
        <path
          d={`M0,${height * 0.6} C300,${height * 0.4} 600,${height * 0.8} 900,${height * 0.6} C1050,${height * 0.5} 1200,${height * 0.7} 1200,${height * 0.6} L1200,${height} L0,${height} Z`}
          fill={fillColor}
          opacity="0.8"
        />
        
        {/* Terceira onda */}
        <path
          d={`M0,${height * 0.9} C300,${height * 0.7} 600,${height} 900,${height * 0.9} C1050,${height * 0.8} 1200,${height} 1200,${height * 0.9} L1200,${height} L0,${height} Z`}
          fill={fillColor}
          opacity="0.6"
        />
      </svg>
    </div>
  )
}
