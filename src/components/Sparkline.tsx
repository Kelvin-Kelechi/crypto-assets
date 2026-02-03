import { useMemo } from 'react';

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export const Sparkline = ({ data, color, width = 120, height = 40 }: SparklineProps) => {
  const path = useMemo(() => {
    if (!data || data.length === 0) return '';

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const stepX = width / (data.length - 1);

    // If range is 0 (flat line), center it
    const effectiveRange = range === 0 ? 1 : range;

    return data
      .map((price, i) => {
        const x = i * stepX;
        // Invert Y because SVG coordinates start from top
        const y = height - ((price - min) / effectiveRange) * height;
        return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
      })
      .join(' ');
  }, [data, width, height]);

  // Determine trend color if not provided
  const trendColor = useMemo(() => {
    if (color) return color;
    if (!data || data.length < 2) return '#9ca3af'; // gray-400
    return data[data.length - 1] >= data[0] ? '#10b981' : '#ef4444'; // emerald-500 : red-500
  }, [data, color]);

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={path}
        fill="none"
        stroke={trendColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
