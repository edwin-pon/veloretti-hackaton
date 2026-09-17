import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IntakePreview from './IntakePreview'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IntakePreview />
  </StrictMode>,
)
