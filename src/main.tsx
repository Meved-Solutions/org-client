import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import DataLoader from './components/elements/DataLoader.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
        <DataLoader/>
        <App />
    </RecoilRoot>
  </React.StrictMode>,
)
