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
          <Route exact path="/" className="menuItem" component={Home} />
          <Route path="/add" component={Add} />
          <Route path="/edit/:rowIndex" component={Edit} />
          <Route path="/export-data" component={Export} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
