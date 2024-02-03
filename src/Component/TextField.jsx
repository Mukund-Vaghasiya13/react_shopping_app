

const TextField = (
{
    type,
    lable,
    placeholder,
    setValue,
},
) => {
    return ( <>
        <div className="h-fit w-10/12 sm:w-3/4 md:w-1/2 flex flex-col gap-3">
        <label className="text-2xl sm:text-3xl md:text-4xl font-bold">{lable}</label>
        <input  type={type} placeholder={placeholder} className="w-full h-10 pl-3 rounded border-2 border-black focus:border-green-400 outline-none" onChange={(e)=>{
            setValue(e.currentTarget.value)
        }} ></input>
        </div>
    </> );
}

export default TextField;