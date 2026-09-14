import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
function App() {
  
  return (
    <>
   <Routes >
    <Route path="/" element={<h1 className="text-amber-300 font-bold underline">DetalBook</h1>}/>
    <Route path="/login" element={<Login/>}/>
   </Routes>
    </>
  )
}

export default App
