import { forwardRef, useState } from "react";
import { ApiService } from "../ApiHelper/ApiService";

function Dailog(
  { token, close, fortype, urltouplode, onUplodeComplete, refId = null },
  ref
) {
  const [File, Setfile] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [lodind, setloding] = useState(false);

  const UplodeLogic = async () => {
    const header = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token.Token}`,
    };
    const formData = new FormData();
    if (fortype == "catgory") {
      formData.append(fortype, File);
      formData.append("name", name);
    } else {
      formData.append(fortype, File);
      formData.append("name", name);
      formData.append("catagoryID", refId); //price
      formData.append("price", price);
    }
    const response = await ApiService.PostData(urltouplode, formData, header);
    if (response) {
      if (response.status == 201) {
        const Response = response.data;
        if (Response.success) {
          setloding(false);
          onUplodeComplete(token.Token);
        }
      } else {
        console.log(response.data.message);
      }
    }
  };

  return (
    <>
      <dialog ref={ref} className="h-fit w-30 p-2">
        <div className="w-fit flex flex-col justify-center items-center gap-3">
          <input
            type="file"
            className="w-10/12"
            onChange={(e) => {
              Setfile(e.currentTarget.files[0]);
            }}
          ></input>
          <input
            type="text"
            placeholder="Enter catagory name"
            className="p-3 h-10 w-10/12 outline-none  rounded border-2 border-black focus:border-green-300"
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          ></input>
          {fortype != "catgory" ? (
            <>
              <input
                type="text"
                placeholder="Enter Price"
                className="p-3 h-10 w-10/12 outline-none  rounded border-2 border-black focus:border-green-300"
                onChange={(e) => {
                  setPrice(e.currentTarget.value);
                }}
              ></input>
            </>
          ) : (
            <></>
          )}
          <div className="flex gap-3">
            <button
              disabled={lodind}
              className="bg-black text-white active:bg-white active:text-black p-2 rounded font-bold"
              onClick={close}
            >
              Cancle
            </button>
            <button
              className="bg-black text-white active:bg-white active:text-black p-2 rounded font-bold"
              onClick={() => {
                setloding(true);
                UplodeLogic();
              }}
            >
              Uplode
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default forwardRef(Dailog);
