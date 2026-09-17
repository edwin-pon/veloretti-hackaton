import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import { CampaignProvider } from './lib/campaign-store'
import { StoreProvider } from './lib/store'

const container = document.getElementById('root')
if (!container) throw new Error('Missing #root element')

createRoot(container).render(
  <StrictMode>
    <StoreProvider>
      <CampaignProvider>
        <App />
      </CampaignProvider>
    </StoreProvider>
  </StrictMode>,
)
