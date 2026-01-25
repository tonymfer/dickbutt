'use client';

import styled from 'styled-components';

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
}

const ChartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartWrapper = styled.div<{ $size: number }>`
  position: relative;
  width: ${props => props.$size + 180}px;
  height: ${props => props.$size + 100}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartSvg = styled.svg`
  filter: drop-shadow(1px 1px 0 #000);
`;

const Label = styled.div<{ $top?: string; $bottom?: string; $left?: string; $right?: string }>`
  position: absolute;
  font-size: 13px;
  font-weight: bold;
  color: #000;
  white-space: nowrap;
  ${props => props.$top && `top: ${props.$top};`}
  ${props => props.$bottom && `bottom: ${props.$bottom};`}
  ${props => props.$left && `left: ${props.$left};`}
  ${props => props.$right && `right: ${props.$right};`}
`;

export function PieChart({ data, size = 130 }: PieChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 2;

  // Calculate pie slices as paths
  let currentAngle = -90; // Start from top

  const slices = data.map((segment) => {
    const percentage = segment.value / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    // Convert angles to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate arc points
    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    // Large arc flag
    const largeArc = angle > 180 ? 1 : 0;

    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    currentAngle = endAngle;

    return { ...segment, path };
  });

  return (
    <ChartContainer>
      <ChartWrapper $size={size}>
        {/* Team label - top */}
        <Label $top="0" $left="50%" style={{ transform: 'translateX(-50%)' }}>
          Team: 10%
        </Label>

        {/* Community label - left */}
        <Label $top="50%" $left="0" style={{ transform: 'translateY(-50%)' }}>
          Community: 50%
        </Label>

        {/* Marketing label - right */}
        <Label $top="30%" $right="0">
          Marketing: 20%
        </Label>

        {/* Liquidity label - bottom */}
        <Label $bottom="0" $left="50%" style={{ transform: 'translateX(-20%)' }}>
          Liquidity: 20%
        </Label>

        <ChartSvg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ position: 'absolute' }}
        >
          {/* Black outline circle */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          {slices.map((slice, index) => (
            <path
              key={index}
              d={slice.path}
              fill={slice.color}
              stroke="#000"
              strokeWidth="1"
            />
          ))}
        </ChartSvg>
      </ChartWrapper>
    </ChartContainer>
  );
}
