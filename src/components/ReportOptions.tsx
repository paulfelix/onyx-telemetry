import { AppContext } from "@/appContext";
import { getSortedDataTypes } from "@/utils/dataUtils";
import { toTitleCase } from "@/utils/stringUtils";
import { omit } from "lodash";
import { useCallback, useContext, useMemo, useState, type ChangeEventHandler } from "react";

function ReportOptions() {
  return (
    <>
      <button className="uk-icon-button uk-float-right" data-uk-icon="settings" uk-toggle="target: #offcanvas-flip" />
      <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
        <div className="uk-offcanvas-bar">
          <button className="uk-offcanvas-close" type="button" data-uk-close></button>
          <DataTypes />
        </div>
      </div>
    </>
  )
}

function DataTypes() {
  const contextValue = useContext(AppContext);
  const dataTypes = useMemo(() => getSortedDataTypes(contextValue?.userData?.groupedLogs), [contextValue]);
  const settings = useMemo(() => contextValue?.settings ?? {}, [contextValue]);
  const selectedDataTypes = useMemo<string[]>(() => contextValue?.settings?.selectedDataTypes ?? dataTypes, [contextValue, dataTypes]);

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e  => {
    const targetDataType = e.target.name;
    const newSelectedDataTypes: string[] = [];
    dataTypes.forEach(dataType => {
      if (dataType == targetDataType) {
        if (!selectedDataTypes.includes(targetDataType)) {
          newSelectedDataTypes.push(dataType);
        }
      } else if (selectedDataTypes.includes(dataType)) {
        newSelectedDataTypes.push(dataType);
      }
    });
    contextValue?.setSettings({ ...settings, selectedDataTypes: newSelectedDataTypes });
  }, [contextValue, dataTypes, settings, selectedDataTypes]);

  return (
    <>
      <h5>Trip Data Charts</h5>
      <fieldset className="uk-fieldset">
          <ul className="uk-margin-left uk-list">
            {dataTypes.map(dataType =>
              <li key={dataType}>
                <label><input
                  name={dataType}
                  className="uk-checkbox"
                  type="checkbox"
                  checked={selectedDataTypes.includes(dataType)}
                  onChange={onChange}
                />{' ' + toTitleCase(dataType)}</label>
              </li>
            )}
          </ul>
      </fieldset>
    </>
  );
}
export default ReportOptions
