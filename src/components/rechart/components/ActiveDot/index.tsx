import {memo} from "react";
import {CustomActiveDotProps, DataWithZScore} from "../../types.ts";

export const CustomActiveDot = memo<CustomActiveDotProps>((props) => {
    const { cx, cy, payload, dataKey, fill } = props;

    const metricMap = {
        pv: { anomaly: "pvIsAnomaly", zScore: "pvZScore" },
        uv: { anomaly: "uvIsAnomaly", zScore: "uvZScore" },
    };

    const metric = metricMap[dataKey as keyof typeof metricMap] || {};
    const isAnomaly = metric.anomaly ? payload?.[metric.anomaly as keyof DataWithZScore] : false;

    const stroke = isAnomaly ? "red" : props.stroke;
    const fillColor = isAnomaly ? "red" : fill;

    return (
        <circle
            cx={cx}
            cy={cy}
            r={8}
            fill={fillColor}
            stroke={stroke}
            strokeWidth={2}
        />
    );
});
