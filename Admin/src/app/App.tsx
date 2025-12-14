import { AppProvider } from "./providers"
import { Route, Routes } from "react-router"
import { routeItems } from "./routes/routeItems"

function App() {
  return (
    <AppProvider>
      <Routes>
        {routeItems.map((route) => (
          <Route {...route} />
        ))}
      </Routes>
    </AppProvider>
  )
}

export default App
