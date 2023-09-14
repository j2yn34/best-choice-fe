// import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App.tsx";
import "./assets/style.css";
import { RecoilRoot } from "recoil";
// import { worker } from "./mocks/worker.ts";

// if (import.meta.env.VITE_MSW_ENABLED === "true") {
//   worker.start();
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
    <ReactQueryDevtools />
  </QueryClientProvider>
  // </React.StrictMode>
);
