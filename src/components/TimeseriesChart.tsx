import { Chart } from "react-google-charts";

type TimeseriesChartProps = {
  data: Array<any[]>,
  options?: Record<string, any>
}

function TimeseriesChart({ data, options={} }: TimeseriesChartProps) {
    const labels: any[] = data[0] as any[];
    const series = {
      0: { type: 'LineChart', targetAxisIndex: 0 },
      1: { type: 'AreaChart', targetAxisIndex: 1, curveType: 'function' }
    };
    const vAxes = {
      0: { title: labels[1], titleTextStyle: { italic: false }, format: '###' },
      1: { title: labels[2] ?? '', titleTextStyle: { italic: false }, format: '###' },
    };

    const chartOptions = {
      chartArea: {
        width: '85%',
        height: '80%',
      },
      legend: "none",
      series,
      vAxes,
      ...options,
    };



    return (
      <div>
        <Chart
          chartType="ComboChart"
          data={data}
          options={chartOptions}
          width="100%"
          height="200px"
        />
      </div>
    );
}

export default TimeseriesChart
