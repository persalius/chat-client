import React, {Component} from 'react';
import {Router, Route, Switch, Redirect} from "react-router-dom";
import PrivateRoute from "../../containers/PrivateRoute";
import WelcomePage from "../../containers/WelcomePage";
import ChatPage from "../../containers/ChatPage";
import history from "../../utils/history";

class App extends Component {
  render() {
    return(
        <Router history={history}>
          <Switch>
            <Route path="/(welcome)?" component={WelcomePage} exact />
            <PrivateRoute path="/chat/:chatId?" component={ChatPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
    )
  }
}

export default App;
