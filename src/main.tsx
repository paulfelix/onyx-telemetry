import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons.js';

UIkit.use(Icons);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
