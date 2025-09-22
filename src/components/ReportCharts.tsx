import { useContext } from 'react';
import TimeseriesChart from '@components/TimeseriesChart'
import { AppContext } from '@/appContext';
import { toTitleCase } from '@/utils/stringUtils';
import { calcMeasurementIntegral, getMeasurementIntegralUnit, getMeasurementUnit, getSortedDataTypes } from '@/utils/dataUtils';


function ReportCharts() {
  const contextValue = useContext(AppContext);
  if (!contextValue?.userData) {
    return null;
  }
  const groupedLogs = contextValue?.userData?.groupedLogs;
  const sortedDataTypes: string[] = contextValue.settings?.selectedDataTypes ?? getSortedDataTypes(groupedLogs);
  const sortedTimeseries = sortedDataTypes.map(dataType => {
    const unit = getMeasurementUnit(dataType)
    const title = toTitleCase(dataType);
    const label =  unit ? `${title} (${unit})` : title;
    const labels = ['time', label];
    const timeseries = [labels];
    const rows = groupedLogs[dataType];
    const integralUnit = getMeasurementIntegralUnit(dataType)

    if (integralUnit) {
      labels.push(integralUnit);
      const integralChunk: number[] = [];
      var integralValue = 0;
      rows.forEach((entry: Record<string, any>, index: number) => {
        const time = new Date(entry.timestamp);
        integralChunk.push(entry.value);
        if ((time.getSeconds() === 0 || index === rows.length - 1) && integralChunk.length > 10) {
          integralValue += calcMeasurementIntegral(dataType, integralChunk);
          integralChunk.length = 0;
          integralChunk.push(entry.value);
          timeseries.push([time, entry.value, integralValue]);

        } else {
          timeseries.push([time, entry.value, null]);
        }
      })
    } else {
      rows.forEach((entry: Record<string, any>) => {
        timeseries.push([new Date(entry.timestamp), entry.value]);
      })
    }
    return timeseries;
  });

  return (
    <div className="uk-margin-bottom">
      {sortedTimeseries.map((data: any[], index) => {
        const options = index < sortedTimeseries.length -1 ? {hAxis: { textPosition: 'none' }} : {};
        return <TimeseriesChart key={data[0][1]} data={data} options={options}/>
      })}
    </div>
  )
}

export default ReportCharts
