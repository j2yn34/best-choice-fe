import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Router from "./router/router";
import ScrollToTop from "./components/ScrollToTop";
import ErrorPage from "./views/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <ScrollToTop />
        <Header />
        <main className="main pt-12 md:pt-20 pb-24 px-4 md:px-12 mx-auto xl:container">
          <ErrorBoundary FallbackComponent={ErrorPage}>
            <Router />
          </ErrorBoundary>
        </main>
        <Footer />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
