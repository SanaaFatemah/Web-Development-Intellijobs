import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, RegisterUser, FrontPage, ErrorPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>} />
        <Route path="/RegisterUser" element={<RegisterUser></RegisterUser>} />
        <Route path="/FrontPage" element={<FrontPage></FrontPage>} />
        <Route path="*" element={<ErrorPage></ErrorPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
