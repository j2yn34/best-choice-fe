import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Router from "./router/router";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <section className="main pt-12 md:pt-20 pb-24 px-4 md:px-12 mx-auto xl:container">
        <Router />
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
