
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Report from "./Report";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/report" component={Report} />
    </Switch>
  </Router>
);

export default App;
