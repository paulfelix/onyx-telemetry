import { useContext, useState } from "react";
import ReportCharts from "./ReportCharts"
import ReportSummary from "./ReportSummary"
import { AppContext } from "@/appContext";

function Report() {
  const contextValue = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('summary')
  const activeClass = (name: string) => activeTab == name ? 'uk-active' : '';

  return (
    <>
      <h3>{contextValue?.userData?.filename}</h3>
      <ul data-uk-tab>
        <li className={activeClass('summary')}><a href="" onClick={() => setActiveTab('summary')}>Summary</a></li>
        <li className={activeClass('charts')}><a href="" onClick={() => setActiveTab('charts')}>Charts</a></li>
      </ul>
      {activeTab == 'summary' && <ReportSummary />}
      {activeTab == 'charts' && <ReportCharts />}
    </>
  )
}

export default Report
