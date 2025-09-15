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
