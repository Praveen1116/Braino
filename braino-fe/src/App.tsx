import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { SharePage } from "./components/SharePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/braino" element={<Dashboard />} />
          <Route path="/braino/share/:shareLink" element={<SharePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
