import { useSelector,useDispatch } from "react-redux";
import CustomButton from "../Component/Button";
import Header from "../Component/Header";
import { useEffect, useState } from "react";
import { deleteProduct } from "../Redux/CartModle.js";
import { useNavigate } from "react-router-dom";


function ProductCart() {
    const Cart = useSelector((state)=>state.Cart)
    const [total,setTotal] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
       let sum = 0

       if (!Cart.product || Cart.product.length === 0) {
        navigate('/');
    }

       Cart.product.map((e)=>{
        sum += Number.parseInt(e.price)
        })

        setTotal(sum)
    },[Cart])

    return ( 
        <>
            <Header title={"Cart"}/>
           <div className="w-screen h-dvh flex flex-col justify-center items-center">
            <div className="w-full h-1/2 flex flex-col justify-center p-2 items-center overflow-scroll gap-3">
            {
            Cart.product && Cart.product.map((e,i)=>{

                return (
                    <div key={i} className="w-10/12 md:w-1/2 h-20 flex justify-between items-center bg-gray-300 rounded p-2">
                       <div className="flex flex-col font-bold">
                       <h1 className="text-3xl ">{e.name}</h1>
                       <h1>{`\$${e.price}`}</h1>
                       </div>
                       <CustomButton name={"Remove"} className={"h-10 w-36"} Action={()=>{
                        dispatch(deleteProduct(i))
                       }}/>
                    </div> 
                )
            })
            }
           
            </div>
            <div className="w-10/12 md:w-1/2 h-20 flex justify-between items-center  rounded p-2">
                <CustomButton name={"Buy"} className={"h-10 w-36"}/>
                <h1>{`\$${total}`}</h1>
            </div>
           </div>
        </>
    );
}

export default ProductCart;