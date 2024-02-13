import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../Redux/Auth.js";
import { useNavigate } from "react-router-dom";
import Header from "../Component/Header.jsx";
import { ApiService } from "../ApiHelper/ApiService.js";
import Dailog from "../Component/Dailog.jsx";
import { useRef } from "react";
import CustomButton from "../Component/Button.jsx";

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
      "https://soppingapp.onrender.com/api/v1/Shopping/AdminUser/GetCatagory",
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

  const DeleteCatagory = async (catID) => {
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.Token}`,
    };

    const deleteData = {
      catID: catID,
    };

    const response = await ApiService.PostData(
      "https://soppingapp.onrender.com/api/v1/Shopping/Admin/Catagory/Delete",
      deleteData,
      header
    );
    if (response) {
      if (response.status == 200) {
        const Response = response.data;
        if (Response.success) {
          GetListofCatagory(token.Token);
        }
      } else {
        console.log(response.data.message);
      }
    }
  };

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

        <div className="w-full p-5 flex flex-col gap-3">
          <h1 className="text-2xl text-gray-500 font-semibold">
            Catagory List
          </h1>
          <div className="w-full grid grid-cols-2 sd:grid-cols-3 md:grid-cols-4 gap-3">
            {catagory &&
              catagory.map((e) => {
                return (
                  <div
                    key={e._id}
                    className="w-full flex flex-col items-center justify-center p-2 bg-gray-100 rounded"
                  >
                    <div
                      className="w-full h-full flex flex-col items-center justify-center"
                      onClick={() => {
                        navigate(`/product/${e._id}`);
                      }}
                    >
                      <img
                        src={`${e.image}`}
                        className="h-4/5 w-full object-fill rounded"
                      ></img>
                      <h1 className="text-2xl font-bold">{e.name}</h1>
                    </div>
                    {token.identity == "admin" ? (
                      <>
                        <CustomButton
                          className={"h-16 w-full p-2"}
                          name={"Delete"}
                          Action={() => {
                            DeleteCatagory(e._id);
                          }}
                        ></CustomButton>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        <Dailog
          ref={ref}
          urltouplode={"https://soppingapp.onrender.com/api/v1/Shopping/Admin/Create/Catagory"}
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
