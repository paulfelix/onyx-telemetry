import { AppContext } from '@/appContext';
import { groupBy } from 'lodash';
import { useContext } from 'react';
import { useFilePicker } from 'use-file-picker';

function ReportFilePrompt() {
  const contextValue = useContext(AppContext);
  const { openFilePicker, loading } = useFilePicker({
    accept: '.json',
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }: any) => {
      const userData = JSON.parse(filesContent[0].content);
      userData.filename = plainFiles[0].name;
      userData.groupedLogs = groupBy(userData.logs, 'type');
      delete userData.logs;
      contextValue?.setUserData(userData);
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4>ONYX Telemetry Analytics</h4>
      <p>Select your recorded Qdash trip file and view an analytics report.</p>
      <button className="uk-button uk-button-default" onClick={() => openFilePicker()}>Select Qdash File</button>
    </div>
  );
}

export default ReportFilePrompt;
