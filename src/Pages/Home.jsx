import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../Redux/Auth.js";
import { useNavigate } from "react-router-dom";
import Header from "../Component/Header.jsx";
import { ApiService } from "../ApiHelper/ApiService.js";
import List from "../Component/List.jsx";

function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.Auth);
    const [catagory,setCatagory] = useState(null)

    const GetListofCatagory = async(token)=>{
      const header = {
        "Authorization":`Bearer ${token}`
      }
      const response = await ApiService.Getdata("/api/v1/Shopping/AdminUser/GetCatagory",header)
      if(response){
        if(response.status == 200){
          const Response = response.data
          setCatagory(Response.data)
        }else{
          console.log(response.data.message)
        }
      }
    }

    useEffect(() => {
      const local = JSON.parse(localStorage.getItem("AuthToken"));
      
      if (local) {
        dispatch(setToken({ Token: local.Token, identity: local.identity }));
        GetListofCatagory(local.Token)
      } else {
        navigate("/login")
      }
    }, []);

   return (
      <>
        <div className="h-screen w-screen felx flex-col">
          <Header token={token} title={"Catalog"}/>
          <List list={catagory} title={"Catagory List"}></List>
        </div>
      </>
   )
}

export default Home;