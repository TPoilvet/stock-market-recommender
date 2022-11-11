import React, { useMemo } from "react";
import { CurrencyHelper } from "../../helpers";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { HistoryDataType } from "./types";

type HistoryChartProps = {
  history: HistoryDataType[];
};

function HistoryChart(props: HistoryChartProps): JSX.Element {
  const { history } = props;

  const chartMinMax = useMemo<{ min: number; max: number }>(() => {
    const minHistory = history.reduce((prev, curr) => {
      return prev.value < curr.value ? prev : curr;
    });

    const maxHistory = history.reduce((prev, curr) => {
      return prev.value > curr.value ? prev : curr;
    });

    return {
      min: Math.trunc(minHistory.value),
      max: Math.trunc(maxHistory.value),
    };
  }, [history]);

  const sortedHistory = useMemo<HistoryDataType[]>(() => {
    return history.filter((x) => !x.closed);
  }, [history]);

  return (
    <div className="history-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={sortedHistory}
          margin={{
            top: 10,
            right: 30,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" minTickGap={25} />
          <YAxis
            type="number"
            domain={[chartMinMax.min - 5, chartMinMax.max + 5]}
          />
          <Tooltip formatter={(value) => `${CurrencyHelper.format(value)}`} />
          <Area dataKey="value" stroke="#82ca9d" fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoryChart;
