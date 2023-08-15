import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Router from "./router/router";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
