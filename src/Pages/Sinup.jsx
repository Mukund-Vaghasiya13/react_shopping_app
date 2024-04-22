import TextField from "../Component/TextField.jsx";
import CustomButton from "../Component/Button.jsx";
import { setToken } from "../Redux/Auth.js";
import {useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ApiService } from "../ApiHelper/ApiService.js";


function Sinup() {

    const [username, setusername] = useState("")
    const [password, setPassword] = useState("")
    const [email,setEmail] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return ( 
        <>
            <div className="h-screen w-screen flex flex-col items-center justify-center gap-3">
                <TextField type={"text"} lable={"Email"} placeholder={"Enter Email"} setValue={setEmail}/>
                <TextField type={"text"} lable={"Username"} placeholder={"Enter Username"} setValue={setusername}/>
                <TextField type={"password"} lable={"Password"} placeholder={"Enter Email"} setValue={setPassword}/>
                <CustomButton className={"h-10 w-10/12 sm:w-3/4 md:w-1/2"} name={"Sinup"} Action={async()=>{
                    const sinupdata = {
                        "email":email,
                        "username":username,
                        "password":password,
                    }
                    const response = await ApiService.PostData("https://soppingapp.onrender.com/api/v1/Shopping/register",sinupdata,{
                        "Content-Type":"application/json"
                    })
                    if(response){
                        const success = response.data.success
                        if(success){
                            const logindata = {
                                "username":username,
                                "password":password
                            }
                            const response = await ApiService.PostData("https://soppingapp.onrender.com/api/v1/Shopping/register",logindata,{
                                "Content-Type":"application/json"
                            })
                            if(response){
                                const responsedata = response.data
                                if(responsedata.success){
                                    dispatch(setToken({Token:responsedata.data.token,identity:responsedata.data.identity}))
                                    localStorage.setItem("AuthToken", JSON.stringify({
                                        "Token": responsedata.data.token,
                                        "identity": responsedata.data.identity
                                    }))
                                    navigate("/")
                                }
                            }
                        }
                    }
                }}></CustomButton>
            </div>
        </>
    );
}

export default Sinup;
