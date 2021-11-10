import { BrowserRouter, Routes, Route } from "react-router-dom";

import ConfiguredApolloProvider from "./shared/containers/ConfiguredApolloProvider";
import useAuth from "./shared/hooks/useAuth";
import RequireAuth from "./shared/containers/RequireAuth";
import RedirectUser from "./shared/containers/RedirectUser";

import Auth from "./user/pages/Auth";
import Home from "./tweets/pages/Home";

function App() {
  const { AuthProvider } = useAuth();

  return (
    <AuthProvider>
      <ConfiguredApolloProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RedirectUser>
                  <Auth />
                </RedirectUser>
              }
            />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </ConfiguredApolloProvider>
    </AuthProvider>
  );
}

export default App;
