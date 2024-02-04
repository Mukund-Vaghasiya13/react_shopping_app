import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../Redux/Auth.js";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.Auth);


    useEffect(() => {
      const local = JSON.parse(localStorage.getItem("AuthToken"));
      
      if (local) {
        dispatch(setToken({ Token: local.Token, identity: local.identity }));
      } else {
        navigate("/login")
      }
    }, []);

    return ( 
        <>
            <div>
                {
                    token.Token
                }
            </div>
        </>
     );
}

export default Home;