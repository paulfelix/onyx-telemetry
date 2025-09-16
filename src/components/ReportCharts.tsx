import { useContext } from 'react';
import TimeseriesChart from '@components/TimeseriesChart'
import { AppContext } from '@/appContext';
import { toTitleCase } from '@/utils/stringUtils';
import { getMeasurementUnit, getSortedDataTypes } from '@/utils/dataUtils';


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
    const timeseries = [['time', label]];
    groupedLogs[dataType].forEach((entry: Record<string, any>) => {
      timeseries.push([new Date(entry.timestamp), entry.value]);
    })
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
