import CustomButton from "./Button.jsx";

function List({ token, list, title, ontap = null, OnDeleteAction }) {
  return (
    // TODO: Modify List
    <>
      <div className="w-full p-5 flex flex-col gap-3">
        <h1 className="text-2xl text-gray-500 font-semibold">{title}</h1>
        <div className="w-full grid grig-cols-1 sd:grid-cols-2 md:grid-cols-3 gap-3">
          {list &&
            list.map((e) => {
              return (
                <div
                  key={e._id}
                  className="w-full flex flex-col items-center justify-center p-2"
                >
                  <div
                    className="flex flex-col items-center justify-center"
                    onClick={() => {
                      ontap && ontap(e._id);
                    }}
                  >
                    <img src={`${e.image}`}></img>
                    {e.refId ? (
                      <>
                        <h1>{e.Productname}</h1>
                        <h1>{e.price}</h1>
                      </>
                    ) : (
                      <>
                        <h1>{e.name}</h1>
                      </>
                    )}
                  </div>
                  {token.identity == "admin" ? (
                    <>
                      <CustomButton
                        className={"h-10 w-full 2 p-2"}
                        name={"Delete"}
                        Action={() => {
                          OnDeleteAction(e._id);
                        }}
                      ></CustomButton>{" "}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default List;

/*

<div className="max-h-full w-full ">
                <h1 className="text-2xl text-gray-500 font-semibold">{title}</h1>
                <div className="h-full w-full">
                { list && list.map((e)=>{
                    return <div key={e._id} className="h-24 m-2 p-2 rounded bg-gray-200 flex justify-start gap-3">
                   <div className="flex justify-start gap-3" >
                    <img src={`${e.image}`} className="h-full w-19 rounded" alt={`${e.name}`}></img>
                    <div className="h-full w-full flex justify-center items-center gap-3">
                       
                       
                    </div>
                    </div> 
                    
                </div>
                })}
                </div>
            </div>

*/
