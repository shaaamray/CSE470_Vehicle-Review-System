import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/signup/Signup";
import ProfUpdate from "./pages/profUpdate/ProfUpdate"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Category from "./pages/category/Category";
// import Topbar from "./components/topbar/Topbar";

function App() {
  const data = useSelector((state) => state.user);
  const loggedInUser = data.user;
  return (
    <>
      
      <Router>
      {/* <Topbar /> */}
        <Switch>
          <Route exact path="/">
            {loggedInUser ? <Home /> : <Signup />}
          </Route>
          <Route path="/login">{loggedInUser ? <Home /> : <Login />}</Route>
          <Route path="/signup">{loggedInUser ? <Home /> : <Signup />}</Route>
          <Route path="/profile/:id">
            {loggedInUser ? <Profile /> : <Login />}
          </Route>
          <Route path="/profUpdate/:id">
            {loggedInUser ? <ProfUpdate/> : <Login />}
          </Route>
          <Route path="/category/:category">
            {loggedInUser ? <Category/> : <Login />}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
