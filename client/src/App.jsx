import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import useApolloClient from "./shared/hooks/useApolloClient";
import useAuth from "./shared/hooks/useAuth";
import RequireAuth from "./shared/containers/RequireAuth";
import RedirectUser from "./shared/containers/RedirectUser";

import Auth from "./user/pages/Auth";
import Home from "./tweets/pages/Home";

function App() {
  const client = useApolloClient();
  const { AuthProvider } = useAuth();

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
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
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
