import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
    return (

        <div className="app">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="registration" element={<RegistrationPage/>}/>
                </Route>
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </div>
    )
}

export default App;
