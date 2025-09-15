import { useState } from 'react';
import './App.scss'
import Report from '@components/Report'
import ReportFilePrompt from '@components/ReportFilePrompt'
import { AppContext, type AppContextType } from '@utils/appContext';

function App() {
  const [userData, setUserData] = useState<Record<string, any>>();

  const contextValue: AppContextType = {
    userData,
    setUserData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {userData ? <Report /> : <ReportFilePrompt />}
    </AppContext.Provider>
  )
}

export default App
