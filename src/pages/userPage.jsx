import {useContext} from "react"
import { LoginContext} from "../components/Context/LoginContext"
import '../css/User.css'
import { useTheme } from "../components/Context/ThemeContext"; // Import the useTheme hook

export const UserPage=()=>{
    const { theme } = useTheme();
    const {loginData}=useContext(LoginContext)
    console.log(loginData)
    return(
        <div className={`men ${theme}`}>
            {`Hola ${loginData.userName}`}
        </div>
    )
}