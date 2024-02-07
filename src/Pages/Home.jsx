import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../Redux/Auth.js";
import { useNavigate } from "react-router-dom";
import Header from "../Component/Header.jsx";
import { ApiService } from "../ApiHelper/ApiService.js";
import List from "../Component/List.jsx";
import Dailog from "../Component/Dailog.jsx";
import { useRef } from "react";


function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth);
  const [catagory, setCatagory] = useState(null);
  const ref = useRef(null);

  function ToggleDailog() {
    ref.current.hasAttribute("open")
      ? ref.current.close()
      : ref.current.showModal();
  }

  const GetListofCatagory = async (token) => {
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await ApiService.Getdata(
      "/api/v1/Shopping/AdminUser/GetCatagory",
      header
    );
    if (response) {
      if (response.status == 200) {
        const Response = response.data;
        setCatagory(Response.data);
      } else {
        console.log(response.data.message);
      }
    }
  };

  const DeleteCatagory =  async(catID)=>{
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.Token}`,
    };

    const deleteData = {
      "catID":catID
    }

    const response = await ApiService.PostData("/api/v1/Shopping/Admin/Catagory/Delete",deleteData,header)
    if (response) {
      if (response.status == 200) {
        const Response = response.data;
        if(Response.success){
          GetListofCatagory(token.Token)
        }
      } else {
        console.log(response.data.message);
      }
    }
  }

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("AuthToken"));

    if (local) {
      dispatch(setToken({ Token: local.Token, identity: local.identity }));
      GetListofCatagory(local.Token);
    } else {
      navigate("/login");
    }
  }, []);



  return (
    <>
      <div className="h-screen w-screen felx flex-col">
        <Header token={token} title={"Catalog"} AddAction={ToggleDailog} />
        <List
          list={catagory}
          title={"Catagory List"}
          ontap={(id) => {
            navigate(`/product/${id}`);
          }}
          token={token}
          OnDeleteAction={DeleteCatagory}
        ></List>
        <Dailog
          ref={ref}
          urltouplode={"/api/v1/Shopping/Admin/Create/Catagory"}
          token={token}
          close={ToggleDailog}
          fortype={"catgory"}
          onUplodeComplete={GetListofCatagory}
        />
      </div>
    </>
  );
}

export default Home;
