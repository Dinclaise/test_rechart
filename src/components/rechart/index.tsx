import { PureComponent } from "react";
import { mockData as data } from "./lib/mockData";
import { prepareDataForBoth } from "./lib/helpers.ts";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { CustomTooltip } from "./components/CustomTooltip";
import { CustomActiveDot } from "./components/ActiveDot";
import { RawData} from "./types.ts";

export default class Rechart extends PureComponent {
    render() {
        const dataWithZScore = prepareDataForBoth(data as RawData[]);

        return (
            <LineChart
                width={500}
                height={300}
                data={dataWithZScore}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={<CustomActiveDot fill={"#8884d8"} />}
                    dot={({ cx, cy, payload }) => {
                        const isAnomaly = payload?.pvIsAnomaly;
                        return (
                            <circle
                                cx={cx}
                                cy={cy}
                                r={4}
                                fill={isAnomaly ? "red" : "#8884d8"}
                            />
                        );
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#82ca9d"
                    activeDot={<CustomActiveDot fill={"#82ca9d"} />}
                    dot={({ cx, cy, payload }) => {
                        const isAnomaly = payload?.uvIsAnomaly;
                        return (
                            <circle
                                cx={cx}
                                cy={cy}
                                r={4}
                                fill={isAnomaly ? "red" : "#82ca9d"}
                            />
                        );
                    }}
                />
            </LineChart>
        );
    }
}
