import { Link } from "react-router-dom";
export default function SignIn() {
    return(
        <div className="w-14 h-48 bg-green-200 flex justify-center items-center">
            <div className="w-full bg-cyan-800 flex flex-coloumn justify-center items-center p-4 space-y-4">
                <Link to="signin/user">User</Link>
                <Link to="signin/admin">Admin</Link>



            </div>
        </div>
    )
}