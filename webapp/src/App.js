import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterUser, FrontPage, ErrorPage, ProtectedRoute } from "./pages";
import { AllJob,  AddJob,  Profile,  Stats,  SharedLayout} from './pages/dashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {
        <ProtectedRoute>
          <SharedLayout/>
        </ProtectedRoute>
        
        } >
          <Route index element  = {<Stats/>}/>
          <Route path = "all-jobs" element = {<AllJob/>}/>
          <Route path = "add-job" element = {<AddJob/>}/>
          <Route path = "profile" element = {<Profile/>}/>
        </Route>
        <Route path="/RegisterUser" element={<RegisterUser></RegisterUser>} />
        <Route path="/FrontPage" element={<FrontPage></FrontPage>} />
        <Route path="*" element={<ErrorPage></ErrorPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
