import { useParams } from "react-router-dom";
import Dailog from "../Component/Dailog.jsx";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Header from "../Component/Header.jsx";
import { ApiService } from "../ApiHelper/ApiService";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../Redux/Cart.js";
import CustomButton from "../Component/Button.jsx";


function Product() {
  const { id } = useParams();
  const token = useSelector((state) => state.Auth);
  const ref = useRef(null);
  const [ListProduct, setProduct] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function ToggleDailog() {
    ref.current.hasAttribute("open")
      ? ref.current.close()
      : ref.current.showModal();
  }

  const GetProduct = async () => {
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.Token}`,
    };
    const response = await ApiService.Getdata(
      `/api/v1/Shopping/AdminUser/GetProduct/${id}`,
      header
    );
    if ((response.status = 200)) {
      const Response = response.data;
      if (Response.success) {
        setProduct(Response.data);
      }
    }
  };

  const DeleteProduct = async (ProId) => {
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.Token}`,
    };

    const deleteData = {
      ProId: ProId,
    };

    const response = await ApiService.PostData(
      "/api/v1/Shopping/Admin/Catagory/Product/Delete",
      deleteData,
      header
    );
    if (response) {
      if (response.status == 200) {
        const Response = response.data;
        if (Response.success) {
          GetProduct();
        }
      } else {
        console.log(response.data.message);
      }
    }
  };

  useEffect(() => {
    if (token.Token) {
      GetProduct();
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="h-screen w-screen flex flex-col">
        <Header token={token} title={"Catalog"} AddAction={ToggleDailog} />
        <div className="w-full p-5 flex flex-col gap-3">
          <h1 className="text-2xl text-gray-500 font-semibold">Product List</h1>
          <div className="w-full grid grid-cols-1 sd:grid-cols-2 md:grid-cols-3 gap-3">
            {ListProduct &&
              ListProduct.map((e) => {
                return (
                  <div
                    key={e._id}
                    className="w-full flex flex-col items-center justify-center p-2 bg-gray-100 rounded"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <img
                        src={`${e.image}`}
                        className="h-4/5 w-full object-fill rounded"
                      ></img>
                      <div className="w-full flex justify-between items-center p-2">
                        <h1 className="text-2xl font-bold">{e.Productname}</h1>
                        <h1 className="text-2xl font-bold">{`$ ${e.price}`}</h1>
                      </div>
                    </div>
                    {token.identity == "admin" ? (
                      <>
                          <div className="flex justify-center w-full h-16">
                            <CustomButton
                              className={"h-full w-1/2 p-2"}
                              name={"Delete"}
                              Action={() => {
                                DeleteProduct(e._id)
                              }}
                            />
                            <CustomButton
                              name={"Add to Cart"}
                              className={"h-full w-1/2 p-2"}
                              Action={() => {
                                dispatch(
                                  addProduct({
                                    name: e.Productname,
                                    price: e.price,
                                  })
                                );
                              }}
                            />
                          </div>
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
          fortype={"product"}
          close={ToggleDailog}
          token={token}
          urltouplode={"/api/v1/Shopping/Admin/Create/Product"}
          refId={id}
          onUplodeComplete={GetProduct}
        ></Dailog>
      </div>
    </>
  );
}

export default Product;
