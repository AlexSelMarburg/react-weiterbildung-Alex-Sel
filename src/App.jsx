import "./App.css";
import { Route } from "wouter";
import { lazy, Suspense } from "react";

import Home from "./pages/HomePage.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { Navbar } from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WebsiteWrapper from "./components/WebsiteWrapper.jsx";
const Music = lazy(() => import("./pages/MusicPage.jsx"));
const Movies = lazy(() => import("./pages/Movies.jsx"));

function App() {
  return (
    <div id="App">
      <WebsiteWrapper>
        <Navbar />
        <Route path="/" component={Home} />
        <Suspense fallback={<LoadingScreen />}>
          <Route path="/music" component={Music} />
          <Route path="/movies" component={Movies} />
        </Suspense>
        <Footer />
      </WebsiteWrapper>
    </div>
  );
}

export default App;
