import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router/router";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <ScrollToTop />
              <Router />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
