import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import ComplaintList from "./pages/Admin/ComplaintList"
import ComplaintDetail from "./pages/Admin/ComplaintDetail"

const AdminAuthenticated = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ComplaintList />} />
            <Route path="/complaint/:id" element={<ComplaintDetail />} />
        </Routes>
    )
}

export default AdminAuthenticated