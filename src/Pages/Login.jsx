import { useDispatch } from "react-redux";
import { login } from "../Redux/Auth.js";

function Login() {
    
    const dispatch = useDispatch()

    return ( <>
    
        <div>Login</div>
        <button onClick={()=>{
            const data = {
                username:"Mukund",
                password:"123"
            }
            dispatch(login(data))
        }}>Click</button>
    
    </> );
}

export default Login;