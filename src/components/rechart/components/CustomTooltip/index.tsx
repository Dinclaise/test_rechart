import {FC} from "react";
import {CustomTooltipProps, DataWithZScore, MetricKey} from "../../types.ts";

export const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;

    const tooltipStyle = {
        backgroundColor: "#ffffff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        padding: "12px",
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
    };

    const metricMap = {
        pv: { anomaly: "pvIsAnomaly", zScore: "pvZScore" },
        uv: { anomaly: "uvIsAnomaly", zScore: "uvZScore" },
    };

    return (
        <div style={tooltipStyle}>
            <p>
                <strong>{label}</strong>
            </p>
            {payload.map((entry, index) => {
                const { name, value, payload } = entry;
                const metric = metricMap[name as MetricKey] || {};
                const isAnomaly = metric.anomaly ? payload[metric.anomaly as keyof DataWithZScore] : false;
                const zScore = metric?.zScore
                    ? payload[metric.zScore as keyof DataWithZScore]?.toFixed(2)
                    : null;

                return (
                    <p key={index} style={{ color: isAnomaly ? "red" : entry.color }}>
                    <span
                        style={{
                            display: "inline-block",
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: isAnomaly ? "red" : entry.color,
                            marginRight: "8px",
                        }}
                    />
                        {name}: {value} (z-score: {zScore})
                    </p>
                );
            })}
        </div>
    );
};
