import { GrAdd } from "react-icons/gr";
import { TbLogout } from "react-icons/tb";
import { setToken } from "../Redux/Auth.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ token, title, AddAction}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
            <div className="w-full flex justify-between p-3">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">{title}</h1>
                <div className="flex items-center gap-5">
                    {token && token.identity == "admin" ? (<>
                        <button onClick={() => {
                           AddAction()
                        }}><GrAdd size={30} /></button>
                    </>) : (<></>)}
                    <button onClick={() => {
                        localStorage.removeItem("AuthToken")
                        dispatch(setToken({ Token: null, identity: null }))
                        navigate("/login")
                    }}><TbLogout size={30} /></button>
                </div>
               
            </div>
        </>
    );
}

export default Header;