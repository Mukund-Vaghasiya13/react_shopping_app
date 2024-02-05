function List({list,title}) {
    return ( 
        <>
            <div className="max-h-full w-full p-5 flex flex-col gap-3">
                <h1 className="text-2xl text-gray-500 font-semibold">{title}</h1>
                <div className="h-full w-full">
                { list && list.map((e)=>{
                    return <div key={e._id} className="h-24 p-2 rounded bg-gray-200 flex justify-start gap-3">
                        <img src={`${e.image}`} className="h-full w-19 rounded" alt={`${e.name}`}></img>
                        <div className="h-full w-full flex justify-center items-center">
                            <h1 className="text-2xl font-bold">{e.name}</h1>
                        </div>
                    </div>
                })}
                </div>
            </div>
        </>

    );
}

export default List;