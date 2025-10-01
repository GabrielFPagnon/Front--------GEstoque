import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Componente  from './componente.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Componente />
  </StrictMode>,
)
