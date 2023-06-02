import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Header from './components/Header';
import City from './components/City';
import Zone from './components/Zone';
import Series from './components/Series';
import User from './components/User';
import Restaurant from './components/Restaurant';
import Specialites from './components/Specialites';


function App() {
  return (
    <div className="App">
      <div style={{ backgroundColor: "white" }}>
      <BrowserRouter>
        <Header />
        <div>
            <Routes>
              <Route path="/*" element={<Home />}></Route>
              <Route path="/City/*" element={<City />}></Route>
              <Route path="/Zone/*" element={<Zone />}></Route>
              <Route path="/Series/*" element={<Series />}></Route>
              <Route path="/Specialites/*" element={<Specialites />}></Route>
              <Route path="/User/*" element={<User />}></Route>
              <Route path="/Restaurant/*" element={<Restaurant />}></Route>
            </Routes>
          
        </div>
        </BrowserRouter>

      </div>

    </div>
  );
}

export default App;
