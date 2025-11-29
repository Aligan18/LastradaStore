import { StoreProvider } from "./providers";
import { PurchasePage } from "@pages";

function App() {
  return (
    <StoreProvider>
      <PurchasePage />
    </StoreProvider>
  );
}

export default App;
