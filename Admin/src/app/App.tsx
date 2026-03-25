import { AppProvider } from "./providers"
import { Navigate, Route, Routes } from "react-router"
import { routeItems } from "./routes/routeItems"
import { RoutePath } from "./routes/constants/routePath"

function App() {
  return (
    <AppProvider>
      <Routes>
        {routeItems.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Route path="*" element={<Navigate to={RoutePath.REALIZATION} replace />} />
      </Routes>
    </AppProvider>
  )
}

export default App
