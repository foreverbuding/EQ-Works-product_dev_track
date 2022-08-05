import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={''} exact element={<Home />}  />
        <Route path={'detail/:poi_id'} element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
