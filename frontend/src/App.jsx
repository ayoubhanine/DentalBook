import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
function App() {
  
  return (
    <>
   <Routes >
    <Route path="/" element={<h1 className="text-amber-300 font-bold underline">DetalBook</h1>}/>
    <Route path="/login" element={<Login/>}/>
     <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
   </Routes>
    </>
  )
}

export default App
