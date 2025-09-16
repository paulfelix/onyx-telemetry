const expectedDataTypes = ['throttle', 'brake', 'current', 'poweroutput', 'speed', 'motortemp', 'controllertemp', 'voltage'];

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
      return 'kW';
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
