import React from "react";
import { motion } from "motion/react";

export type ProgressBarProps = {
  value: number; // Progress value (0 to 100)
  type?: "linear" | "circular";
  color?: string;
  thickness?: number;
  size?: number; // Only for circular
  showLabel?: boolean;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  type = "linear",
  color = "#4caf50",
  thickness = 8,
  size = 100,
  showLabel = true,
}) => {
  if (type === "circular") {
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div style={{ width: size, height: size, position: "relative" }}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#ddd"
            strokeWidth={thickness}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </svg>
        {showLabel && (
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {Math.round(value)}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: thickness,
        background: "#D0C8D9",
        borderRadius: thickness / 2,
      }}
    >
      <motion.div
        style={{
          height: "100%",
          width: `${value}%`,
          background: color,
          borderRadius: thickness / 2,
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </div>
  );
};
