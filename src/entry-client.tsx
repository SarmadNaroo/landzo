import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { makeStore } from './store/store'
import './index.css'

const container = document.getElementById('root')!
const store = makeStore()

const app = (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)

const hasSSRMarkup = container.firstElementChild !== null
if (hasSSRMarkup) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
