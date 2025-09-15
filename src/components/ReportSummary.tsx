import { useContext } from 'react';
import { AppContext } from '@/appContext';
import moment from 'moment';

function ReportSummary() {
  const contextValue = useContext(AppContext);
  const userData = contextValue?.userData

  if (!userData) {
    return null;
  }

  const startTime = moment(new Date(userData.startTime)).format('LLLL');
  const endTime = moment(new Date(userData.endTime)).format('LLLL');
  const voltageLog = userData.groupedLogs.voltage;
  const startVoltage = voltageLog && voltageLog[0].value;
  const endVoltage = voltageLog && voltageLog.at(-1).value;

  return (
    <>
      <h3>{userData.filename}</h3>
      <div className="uk-flex uk-flex-left uk-flex-wrap uk-margin-bottom">
        <div className="uk-card uk-card-default uk-card-small uk-card-body uk-margin-small-top uk-margin-small-left">
          <h4 className="uk-card-title">Time</h4>
          <p>
            Start: {startTime}<br/>
            End: {endTime}<br/>
            Duration: {moment.duration(userData.duration, 'seconds').humanize()}
          </p>
        </div>
        <div className="uk-card uk-card-default uk-card-small uk-card-body uk-margin-small-top uk-margin-small-left">
          <h4 className="uk-card-title">Speed</h4>
          <p>
            Max Motor Speed: {Math.round(userData.maxSpeed)}<br/>
            Average Motor Speed: {Math.round(userData.averageSpeed)}<br/>
          </p>
        </div>
        <div className="uk-card uk-card-default uk-card-small uk-card-body uk-margin-small-top uk-margin-small-left">
          <h4 className="uk-card-title">Temperature</h4>
          <p>
            Max Motor Temperature: {userData.maxMotorTemp}C<br/>
            Max Controller Temperature: {userData.maxControllerTemp}C<br/>
          </p>
        </div>
        <div className="uk-card uk-card-default uk-card-small uk-card-body uk-margin-small-top uk-margin-small-left">
          <h4 className="uk-card-title">Voltage</h4>
          <p>
            Start: {startVoltage}<br/>
            End: {endVoltage}
          </p>
        </div>
      </div>
    </>
  )
}

export default ReportSummary
