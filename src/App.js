import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./Components/LoginPage.js";
import Chatroom from "./Components/Chatroom.js";
import { useState } from "react";
function App() {
  // userName : ""
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage
              setUsername={setUsername}
              username={username}
            ></LoginPage>
          </Route>
          <Route path="/chatroom">
            {!username ? (
              <Redirect to="/" />
            ) : (
              <Chatroom username={username}></Chatroom>
            )}
          </Route>
        </Switch>
        {/* choose username */}
        {/* chat window */}
        {/* form : input & submit */}
      </Router>
    </div>
  );
}

export default App;
