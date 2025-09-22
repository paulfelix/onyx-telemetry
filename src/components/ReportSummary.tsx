import { useContext } from 'react';
import { AppContext } from '@/appContext';
import moment from 'moment';
import { mean } from 'lodash';
import { getMeasurementValues, getMeasurementUnit, calcAmpHours, calcDistance, calcWHours } from '@/utils/dataUtils';

function ReportSummary() {
  const contextValue = useContext(AppContext);
  const userData = contextValue?.userData

  if (!userData) {
    return null;
  }

  const startTime = moment(new Date(userData.startTime));
  const endTime = moment(new Date(userData.endTime));
  const controllerTempValues = getMeasurementValues(userData.groupedLogs, 'controllerTemp');
  const motorTempValues = getMeasurementValues(userData.groupedLogs, 'motorTemp');
  const voltageValues = getMeasurementValues(userData.groupedLogs, 'voltage');
  const currentValues = getMeasurementValues(userData.groupedLogs, 'current');
  const throttleValues = getMeasurementValues(userData.groupedLogs, 'throttle');
  const powerValues = getMeasurementValues(userData.groupedLogs, 'powerOutput');
  const speedValues = getMeasurementValues(userData.groupedLogs, 'speed');
  const averageSpeed = calcDistance(speedValues) * 3600 / userData.duration ;

  return (
    <>
      <div className="uk-card uk-card-default uk-card-small uk-card-body uk-border-rounded">
        <h5 className="uk-card-title uk-text-center uk-margin-xsmall">{startTime.format('LL')}</h5>
        <p className="uk-text-center uk-margin-xsmall">{startTime.format('LT')} - {endTime.format('LT')}</p>
        <div className="uk-flex uk-flex-center">
          <div className="uk-text-center uk-margin-xsmall uk-card uk-card-primary uk-card-small uk-card-body uk-border-rounded">
              <ul className="uk-list uk-list-collapse">
                <li>{calcDistance(speedValues).toFixed(1)} Miles in {moment.duration(userData.duration, 'seconds').humanize()}, {averageSpeed.toFixed(1)} MPH (avg)</li>
                <li>{calcAmpHours(currentValues).toFixed(1)} AH</li>
                <li>{calcWHours(powerValues).toFixed(1)} Wh</li>
                <li>{voltageValues[0].toFixed(1)}V → {voltageValues[voltageValues.length-1].toFixed(1)}V</li>
              </ul>
          </div>
        </div>
      </div>
      <div className="uk-flex uk-flex-around uk-flex-wrap">
        <MeasurementStats
          title="Throttle"
          unit={getMeasurementUnit('throttle')}
          avg={mean(throttleValues).toFixed(1)}
          min={Math.min(...throttleValues).toFixed(1)}
          max={Math.max(...throttleValues).toFixed(1)}
        />
        <MeasurementStats
          title="Current"
          unit={getMeasurementUnit('current')}
          avg={mean(currentValues).toFixed(1)}
          min={Math.min(...currentValues).toFixed(1)}
          max={Math.max(...currentValues).toFixed(1)}
        />
        <MeasurementStats
          title="Power Output"
          unit={getMeasurementUnit('powerOutput')}
          avg={mean(powerValues).toFixed(1)}
          min={Math.min(...powerValues).toFixed(1)}
          max={Math.max(...powerValues).toFixed(1)}
        />
        <MeasurementStats
          title="Motor Speed"
          unit={getMeasurementUnit('speed')}
          avg={mean(speedValues).toFixed(1)}
          min={Math.min(...speedValues).toFixed(1)}
          max={Math.max(...speedValues).toFixed(1)}
        />
        <MeasurementStats
          title="Controller Temperature"
          unit={getMeasurementUnit('controllerTemp')}
          avg={mean(controllerTempValues).toFixed(1)}
          min={Math.min(...controllerTempValues).toFixed(1)}
          max={Math.max(...controllerTempValues).toFixed(1)}
        />
        <MeasurementStats
          title="Motor Temperature"
          unit={getMeasurementUnit('motorTemp')}
          avg={mean(motorTempValues).toFixed(1)}
          min={Math.min(...motorTempValues).toFixed(1)}
          max={Math.max(...motorTempValues).toFixed(1)}
        />
        <MeasurementStats
          title="Voltage"
          unit={getMeasurementUnit('voltage')}
          avg={mean(voltageValues).toFixed(1)}
          min={Math.min(...voltageValues).toFixed(1)}
          max={Math.max(...voltageValues).toFixed(1)}
        />
      </div>
    </>
  )
}

type MeasurementStatsProps = {
  title: string,
  avg: string,
  min: string,
  max: string,
  unit: string,
}

function MeasurementStats({ title, avg, min, max, unit}: MeasurementStatsProps) {
  return (
    <div className="uk-card uk-card-default uk-card-small uk-card-body uk-margin-top uk-border-rounded" style={{width: '21em', marginLeft: 5}}>
      <div className="uk-card-header" style={{padding: 5}}>
        <h4 className="uk-card-title">{title} <span className="uk-text-small uk-text-meta uk-float-right" style={{lineHeight: '2em'}}>{unit}</span></h4>
      </div>
      <div className="uk-flex uk-margin-small-top">
        <div className="uk-margin-small-left">
          <p className="uk-margin-remove-bottom uk-text-meta">Average</p>
          <span>{avg}</span><span className="uk-text-small uk-text-meta">{unit}</span>
        </div>
        <div className="uk-margin-small-left">
          <p className="uk-margin-remove-bottom uk-text-meta">Maximum</p>
          <span>{max}</span><span className="uk-text-small uk-text-meta">{unit}</span>
        </div>
        <div className="uk-margin-small-left">
          <p className="uk-margin-remove-bottom uk-text-meta">Minimum</p>
          <span>{min}</span><span className="uk-text-small uk-text-meta">{unit}</span>
        </div>
      </div>
    </div>
  )
}

export default ReportSummary
