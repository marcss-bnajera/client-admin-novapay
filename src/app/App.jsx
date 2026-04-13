import { AuthPage } from "../features/auth/pages/AuthPage.jsx";
import { AppRoutes } from "./router/AppRoutes.jsx"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <AuthPage />
      <Toaster position="top-center"
        toastOptions={{
          style: {
            fontFamily: "inherir",
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: "8px"
          }
        }} />

      <AppRoutes />

    </>
  );
}

export default App;