import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import ScrollToTop from "./components/ScrollToTop";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { newNotificationState, userInfoState } from "./states/recoil.ts";
import { UserInfoState } from "./states/recoilType.ts";

function App() {
  const setNewNotice = useSetRecoilState<boolean>(newNotificationState);
  const userInfo = useRecoilValue<UserInfoState>(userInfoState);
  const memberId = userInfo.memberId;
  const eventSource = new EventSource(`/api/notifications/sub/${memberId}`);

  eventSource.addEventListener("notification", (event) => {
    const data = event.data;
    console.log(data);
    setNewNotice(true);
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
