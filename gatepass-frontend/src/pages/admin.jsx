import { Link } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
export function AdminPage(){
    return(
        <div className="w-full h-screen bg-amber-50">
         <div className="w-[300px] h-screen bg-blue-600 flex flex-coloumn">
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/settings">Settings</Link>
            </div>
      <div className="w-[calc(100%-300px)] h-screen bg-purple-500 flex">
           <Routes path="/*">
            <Route path="/dashboard" element={<h1>Admin Dashboard</h1>}/>
            <Route path="/users" element={<h1>Admin Users</h1>}/>
            <Route path="/settings" element={<h1>Admin Settings</h1>}/>
           </Routes>
        </div>
        </div>
    )
}