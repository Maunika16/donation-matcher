import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode omitted intentionally — it double-invokes effects in dev
// which causes side-effects (localStorage writes, callbacks) to fire twice.
createRoot(document.getElementById('root')).render(<App />)