import { forwardRef } from "react";

function Dailog({ close,fortype}, ref) {
  return (
    <>
      <dialog ref={ref} className="h-fit w-30 p-2">
        <div className="w-fit flex flex-col justify-center items-center gap-3">
          <input type="file" className="w-10/12" onChange={(e)=>{
            console.log(e.target.files)
          }}></input>
          <input
            type="text"
            placeholder="Enter catagory name"
            className="p-3 h-10 w-10/12 outline-none  rounded border-2 border-black focus:border-green-300"
          ></input>
          {
            fortype != "catagory" ? <>
               <input
            type="text"
            placeholder="Enter Price"
            className="p-3 h-10 w-10/12 outline-none  rounded border-2 border-black focus:border-green-300"
          ></input>
            </> : <></>
          }
          <div className="flex gap-3">
            <button
              className="bg-black text-white active:bg-white active:text-black p-2 rounded font-bold"
              onClick={close}
            >
              Cancle
            </button>
            <button
              className="bg-black text-white active:bg-white active:text-black p-2 rounded font-bold"
              onClick={() => {}}
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
