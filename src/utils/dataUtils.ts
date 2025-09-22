import { chunk, sum } from "lodash";

const expectedDataTypes = ['throttle', 'brake', 'current', 'poweroutput', 'speed', 'voltage', 'motortemp', 'controllertemp'];

export function getSortedDataTypes(groupedLogs: Record<string, any>): string[] {
  const foundDataTypes = Object.keys(groupedLogs);
  const foundDataTypesLowerCase = foundDataTypes.map(dataType => dataType.toLowerCase());
  const sortedDataTypes: string[] = [];

  expectedDataTypes.forEach(dataType => {
    const index = foundDataTypesLowerCase.indexOf(dataType);
    if (index >= 0) {
      sortedDataTypes.push(foundDataTypes[index]);
    }
  });

  foundDataTypesLowerCase.forEach((dataType, index) => {
    if (!expectedDataTypes.includes(dataType)) {
      sortedDataTypes.push(foundDataTypes[index]);
    }
  });
  return sortedDataTypes;
}

export function getMeasurementValues(groupedLogs: Record<string, any>, measurement: string) {
  return getMeasurementLog(groupedLogs, measurement).map((entry: any) => entry.value);
}

export function getMeasurementLog(groupedLogs: Record<string, any>, measurement: string) {
  const lowercaseName = measurement.toLowerCase();
  const match = Object.keys(groupedLogs).find(key => key.toLowerCase() == lowercaseName);
  return match ? groupedLogs[match] : undefined;
}

export function getMeasurementUnit(measurement: string) {
  switch(measurement.toLowerCase()) {
    case 'controllertemp':
    case 'motortemp':
      return '℃';
    case 'throttle':
      return '%';
    case 'poweroutput':
      return 'W';
    case 'speed':
      return 'RPM';
    case 'current':
      return 'A';
    case 'voltage':
      return 'V';
    default:
      return '';
  }
}

export function getMeasurementIntegralUnit(measurement: string) {
  switch(measurement.toLowerCase()) {
    case 'poweroutput':
      return 'Wh';
    case 'current':
      return 'AH';
    default:
      return '';
  }
}

export function calcIntegral(values: number[]) {
  return (values[0] + (values.at(-1) ?? 0)) / 2 + sum(values.slice(1, -1))
}

export function calcChunkedIntegrals(values: number[]) {
  const integrals: number[] = [];
  chunk(values, 60).forEach(chunk => integrals.push(calcIntegral(chunk)));
  return integrals;
}

export function calcMeasurementIntegral(measurement: string, values: number[]) {
  switch(measurement.toLowerCase()) {
    case 'poweroutput':
    case 'current':
      return calcIntegral(values) / 3600;
    case 'speed':
      return calcIntegral(values) / 3600 / getSpeedConversionFrequency();
    default:
      return 0;
  }
}

export function calcAmpHours(currentValues: number[]) {
  return calcIntegral(currentValues) / 3600;
}

export function calcDistance(speedValues: number[]) {
  return calcIntegral(speedValues) / 3600 / getSpeedConversionFrequency();
}

export function calcWHours(powerValues: number[]) {
  return calcIntegral(powerValues) / 3600;
}

export function getSpeedConversionFrequency() {
  return 14.8;
}

