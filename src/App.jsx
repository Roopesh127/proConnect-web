import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Body from "./components/Body";
import Feed from "./components/Feed"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              {/* <Route index element={<div>Welcome to Home Page</div>} /> */}
              <Route path="/" element={<Feed />}/>
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
