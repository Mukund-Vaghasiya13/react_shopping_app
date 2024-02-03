import { useDispatch } from "react-redux";
import { setToken } from "../Redux/Auth.js";
import TextField from "../Component/TextField.jsx";
import { useState } from "react";
import CustomButton from "../Component/Button.jsx";
import { ApiService } from "../ApiHelper/ApiService.js";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setusername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (<>
        <div className="h-screen flex flex-col items-center justify-center gap-3">
            <TextField type={"text"} placeholder={"Enter username"} lable={"Username"} setValue={setusername} />
            <TextField type={"password"} placeholder={"Enter Password"} lable={"Password"} setValue={setPassword} />
            <CustomButton name={"Login"} className={" h-10 w-10/12 sm:w-3/4 md:w-1/2"} Action={async () => {
                const response = await ApiService.PostData("/api/v1/Shopping/login", {
                    "username": username,
                    "password": password
                })

                const RequestRes = response.data
                if (RequestRes.success) {
                    console.log(RequestRes)
                    dispatch(setToken({Token:RequestRes.data.token,identity:RequestRes.data.identity}))
                    localStorage.setItem("AuthToken", JSON.stringify({
                        "Token": RequestRes.data.token,
                        "identity": RequestRes.data.identity
                    }))
                    navigate("/")
                }
            }}></CustomButton>
            <label>Or</label>
            <CustomButton name={"Sinup"} className={" h-10 w-10/12 sm:w-3/4 md:w-1/2"}></CustomButton>
        </div>
    </>);
}

export default Login;