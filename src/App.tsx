import { type Component } from "solid-js";
import { Router, Route } from "@solidjs/router";

import HomeGrid from "./pages/HomeGrid";
import GlyphPractice from "./pages/GlyphPractice";

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={HomeGrid} />
      <Route path="/practice/:alphabetIndex" component={GlyphPractice} />
    </Router>
  );
};

export default App;
