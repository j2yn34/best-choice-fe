import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Router from "./router/router";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <section className="main py-20 px-12 mx-auto xl:container">
        <Router />
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
