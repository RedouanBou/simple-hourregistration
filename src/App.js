import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavbarMenu from "./components/NavbarMenu";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Export from "./pages/Export";

function App() {
  return (
    <BrowserRouter>
      <NavbarMenu />

      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/edit/:rowIndex" component={Edit} />
          <Route exact path="/export-data" component={Export} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
