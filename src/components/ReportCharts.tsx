import { useContext } from 'react';
import TimeseriesChart from '@components/TimeseriesChart'
import { AppContext } from '@utils/appContext';
import { groupBy, startCase } from 'lodash';

const dataTypes = ['throttle', 'brake', 'current', 'PowerOutput', 'speed', 'motorTemp', 'controllerTemp', 'voltage'];

function ReportCharts() {
  const contextValue = useContext(AppContext);
  const groupedLogs = contextValue?.userData ? groupBy(contextValue.userData.logs, 'type') : {};
  const sortedLogs = dataTypes
    .filter((dataType) => dataType in groupedLogs)
    .map((dataType) => [dataType, groupedLogs[dataType]]);
  const sortedTimeseries = sortedLogs.map((log: any[]) => {
    const label =  startCase(log[0].replace(/([A-Z])/g, " $1"));
    const timeseries = [['time', label]];
    log[1].forEach((entry: Record<string, any>) =>
      timeseries.push([new Date(entry.timestamp), entry.value]));
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
