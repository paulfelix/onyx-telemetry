import { Chart } from "react-google-charts";

type TimeseriesChartProps = {
  data: Array<any[]>,
  options?: Record<string, any>
}

function TimeseriesChart({ data, options={} }: TimeseriesChartProps) {
    const labels: any[] = data[0] as any[];

    const chartOptions = {
      chartArea: {
        width: '85%',
        height: '80%',
      },
      legend: "none",
      vAxis: {
        title: labels[1],
        titleTextStyle: { italic: false },
        format: '###',
      },
      ...options,
    };



    return (
      <div>
        <Chart
          chartType="LineChart"
          data={data}
          options={chartOptions}
          width="100%"
          height="200px"
        />
      </div>
    );
}

export default TimeseriesChart
