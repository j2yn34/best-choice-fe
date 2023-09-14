import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import ScrollToTop from "./components/ScrollToTop";
import { useRecoilValue } from "recoil";
import { userInfoState } from "./states/recoil.ts";
import { UserInfoState } from "./states/recoilType.ts";

function App() {
  const userInfo = useRecoilValue<UserInfoState>(userInfoState);
  const memberId = userInfo.memberId;
  const eventSource = new EventSource(`/api/notifications/sub/${memberId}`);

  eventSource.addEventListener("notification", (event) => {
    const data = event.data;
    console.log(data);
  });

  eventSource.onerror = (error) => {
    console.log(error);
    eventSource.close();
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Router />
    </BrowserRouter>
  );
}

export default App;
