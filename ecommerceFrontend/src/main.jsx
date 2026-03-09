import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage.jsx";


createRoot(document.getElementById("root")).render(
  <ErrorBoundary FallbackComponent={ErrorPage}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
);
