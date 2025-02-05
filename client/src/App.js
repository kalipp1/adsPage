import Header from "./components/views/Header/Header";
import MainPage from "./components/pages/MainPage/MainPage";
import { Container } from "react-bootstrap";
import Footer from "./components/views/Footer/Footer";
import { Routes, Route } from 'react-router-dom';
import AdPage from "./components/pages/adPage/adPage";
import NotFound from "./components/pages/NotFound/NotFound";
import AdAdd from "./components/pages/AdAdd/AdAdd";
import AdEdit from "./components/pages/AdEdit/AdEdit";
import AdRemove from "./components/pages/AdRemove/AdRemove";
import Search from "./components/pages/Search/Search";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Logout from "./components/pages/Logout/Logout";
import './styles/App.scss';

function App() {
  return (
      <div className="appWrapper">
        <Header />
        <Container className="content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/ads/:id" element={<AdPage />} />
            <Route path="/ads/add" element={<AdAdd />} />
            <Route path="/ads/edit/:id" element={<AdEdit />} />
            <Route path="/ads/remove/:id" element={<AdRemove />} />
            <Route path="/ads/search/:searchPhrase" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </div>
  );
}

export default App;
