import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { UserPage } from './components/UserPage';
import { Home } from './components/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/user/:id' element={<UserPage/>}/>
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
