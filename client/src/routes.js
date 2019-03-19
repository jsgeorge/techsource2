import React from "react";
import logo from "./logo.svg";
import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import "./App.css";
import Home from "./components/home";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <h3>React Client Server App</h3>
//       </div>
//     );
//   }
// }
const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};
export default Routes;
