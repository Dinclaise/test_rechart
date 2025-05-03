// функция для расчёта среднего значения
import {DataWithZScore, RawData} from "../types.ts";

export const calculateAverage = (values: number[]): number => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
};

// функция для расчёта стандартного отклонения
export const calculateStdDev = (values: number[]): number => {
    const average = calculateAverage(values);
    const variance = calculateAverage(
        values.map((val) => Math.pow(val - average, 2))
    );

    return Math.sqrt(variance);
};

export const prepareDataForBoth = (data: RawData[]): DataWithZScore[] => {
    const pvValues = data.map((entry) => entry.pv);
    const uvValues = data.map((entry) => entry.uv);

    // pv
    const pvAverage = calculateAverage(pvValues);
    const pvStdDev = calculateStdDev(pvValues);
    // uv
    const uvAverage = calculateAverage(uvValues);
    const uvStdDev = calculateStdDev(uvValues);

    return data.map((entry) => {
        // pv
        const pvZScore = (entry.pv - pvAverage) / pvStdDev;

        // p.s. я не знал на что конкретно ориентироваться
        // то ли "на рост", то ли на "всё сразу",
        // хоть и в тестовом написано было zScore > 1 (на рост),
        // я сделал и на падение тоже
        // поэтому сделал на "всё сразу" и на рост, и на падение
        const pvIsAnomaly = Math.abs(pvZScore) > 1;

        // uv
        const uvZScore = (entry.uv - uvAverage) / uvStdDev;
        const uvIsAnomaly = Math.abs(uvZScore) > 1;

        return {
            ...entry,
            pvZScore,
            pvIsAnomaly,
            uvZScore,
            uvIsAnomaly,
        };
    });
};
