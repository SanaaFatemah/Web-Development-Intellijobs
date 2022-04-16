import FrontPage from "./pages/FrontPage";
import { BrowserRouter, Routes, Route, link, Link } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/RegisterUser">RegisterUser</Link>
        <Link to="/FrontPage">FrontPage</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/RegisterUser" element={<div>RegisterUser</div>} />
        <Route path="/FrontPage" element={<FrontPage></FrontPage>} />
        <Route path="*" element={<h1>Error Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
