
function CustomButton(
    {
        className,
        Action,
        name,
    }
) {
    return ( 
        <>
        <div className={`${className}`}>
            <button className="rounded bg-black text-white font-bold w-full h-full active:bg-white active:text-black" onClick={()=>{
                Action()
            }}>{name}</button>
        </div>
        </>
     );
}

export default CustomButton;