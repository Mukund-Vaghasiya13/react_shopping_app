import CustomButton from "./Button.jsx";

function List({ token, list, title, ontap = null, OnDeleteAction }) {
  return (
    // TODO: Modify List
    <>
      <div className="w-full p-5 flex flex-col gap-3">
        <h1 className="text-2xl text-gray-500 font-semibold">{title}</h1>
        <div className="w-full grid grid-cols-2 sd:grid-cols-3 md:grid-cols-4 gap-3">
          {list &&
            list.map((e) => {
              return (
                <div
                  key={e._id}
                  className="w-full flex flex-col items-center justify-center p-2 bg-gray-100 rounded"
                >
                  <div
                    className="w-full h-full flex flex-col items-center justify-center"
                    onClick={() => {
                      ontap && ontap(e._id);
                    }}
                  >
                    <img src={`${e.image}`} className="h-4/5 w-full object-fill rounded"></img>
                    {e.refId ? (
                      <>
                        <h1 className="text-2xl font-bold">{e.Productname}</h1>
                        <h1 className="text-2xl font-bold">{e.price}</h1>
                      </>
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold">{e.name}</h1>
                      </>
                    )}
                  </div>
                  {token.identity == "admin" ? (
                    <>
                      <CustomButton
                        className={"h-16 w-full p-2"}
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

