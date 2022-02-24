import Homepage from './components/Homepage';
import Chatbox from './components/Chatbox';
import SellPage from './components/SellPage';
import Search from './components/Search';
import Header from './components/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<> <Homepage /> <Chatbox /> </>}></Route>
        <Route path='/sell' element={<SellPage />}></Route>
        <Route path='/faq' element={<Search />}></Route>
        <Route path='/' element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
