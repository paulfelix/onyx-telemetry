import { AppContext } from '@/utils/appContext';
import { useContext } from 'react';

function ReportFilePrompt() {
  const contextValue = useContext(AppContext);

  const onFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const userData = JSON.parse(e.target.result);
        userData.filename = file.name;
        contextValue?.setUserData(userData);
      };
      reader.readAsText(file);
    }
  };

  console.log('prompt');

  return (
    <div>
      <input type="file" accept=".json" onChange={onFileChange} />
    </div>
  );
}

export default ReportFilePrompt;
