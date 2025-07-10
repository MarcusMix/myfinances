import Layout from "./src/layout/Layout";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}
