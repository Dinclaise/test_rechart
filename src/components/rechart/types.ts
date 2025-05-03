import {LineProps, TooltipProps} from "recharts";

export type RawData = {
    name: string;
    pv: number;
    uv: number;
};

export type DataWithZScore = RawData & {
    pvZScore: number;
    pvIsAnomaly: boolean;
    uvZScore: number;
    uvIsAnomaly: boolean;
};

export type MetricKey = "pv" | "uv";

export type CustomActiveDotProps = LineProps & {
    cx?: number;
    cy?: number;
    payload?: DataWithZScore;
    dataKey?: MetricKey;
    fill?: string;
};

export type TooltipPayloadItem = {
    name: MetricKey;
    value: number;
    color: string;
    payload: DataWithZScore;
};

export type CustomTooltipProps = TooltipProps<number, MetricKey>;


