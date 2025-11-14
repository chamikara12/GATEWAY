//in bellow function name must be uppercased 

import UserData from './userData.jsx';

export default function Header() {
   return(
   <div className="bg-red-300 p-4 text-center">
        <h1 className="text-[]">GatePass Management System</h1>
        <p>This System use for convert paper work to digitalized when create the gate pass and other reports in university of vavuniya main gate.</p>
        <UserData></UserData>
    </div>
    )
}