import { LoginContext } from "./Context/LoginContext";
import {useContext} from "react";
import { useForm } from "./Hooks/useForm";
import '../css/Login.css';
import {useNavigate} from 'react-router-dom';
import { useTheme } from "./Context/ThemeContext"; // Import the useTheme hook


export const FormComponent=()=>{
    const { theme } = useTheme();
    const initialForm={
        userName:'',
        email:'',
        password:''
    }
    const navigate=useNavigate();

    const {userName,email,password,onInputChange}=useForm(initialForm);
    const {updateLoginData}=useContext(LoginContext);

    const onSubmit=(e)=>{
        e.preventDefault()
        updateLoginData({userName,email,password})
        navigate("/userpage");
    }

    return(
        <div className={`Tod ${theme}`}>
            <form className="formul" onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Usuario</label>
                    <input type="userName" className="form-control" name="userName"
                    placeholder="Enter your name" value={userName} onChange={onInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email"
                    placeholder="Enter your email" value={email} onChange={onInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password"
                    placeholder="Enter your password" value={password} onChange={onInputChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}