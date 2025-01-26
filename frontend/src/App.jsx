import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import UserLogin from "./pages/userLogin"
import UserSingup from "./pages/userSingup"
import CaptainSingup from "./pages/captainSingup"
import CaptainLogin from "./pages/captainLogin"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/singup" element={<UserSingup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSingup />} />
    </Routes>
  )
}

export default App