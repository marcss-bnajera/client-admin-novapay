import { AuthPage } from "../features/auth/pages/AuthPage.jsx";
import { AppRoutes } from "./router/AppRoutes.jsx"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;