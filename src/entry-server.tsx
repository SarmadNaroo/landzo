import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import App from './App'
import { makeStore } from './store/store'

export function render(url: string) {
  const store = makeStore()
  const app = (
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  )

  return renderToString(app)
}
