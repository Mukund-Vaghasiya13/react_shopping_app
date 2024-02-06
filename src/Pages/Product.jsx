import { useParams } from 'react-router-dom';
import Dailog from '../Component/Dailog.jsx';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Header from '../Component/Header.jsx';
import { ApiService } from '../ApiHelper/ApiService';
import List from '../Component/List.jsx';

function Product() {
    const {id} = useParams()
    const token = useSelector((state) => state.Auth);
    const ref = useRef(null)
    const [ListProduct,setProduct] = useState([])

    function ToggleDailog(){
        ref.current.hasAttribute("open")? ref.current.close() : ref.current.showModal()
    }

    const GetProduct = async ()=>{
        const header = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.Token}`,
          };
        const response = await ApiService.Getdata("/api/v1/Shopping/AdminUser/GetProduct",header)
        if(response.status = 200){
            const Response = response.data
            if(Response.success){
                setProduct(Response.data)
            }
        }
    }

    useEffect(()=>{
        GetProduct()
    },[token])

    return ( 
        <>
            <div className='h-screen w-screen flex flex-col'>
            <Header token={token} title={"Catalog"} AddAction={ToggleDailog}/>
            <List  list={ListProduct} title={"Product List"}></List>
            <Dailog ref={ref} fortype={"product"} close={ToggleDailog} token={token} urltouplode={"/api/v1/Shopping/Admin/Create/Product"} refId={id} onUplodeComplete={GetProduct}></Dailog>
            </div>
        </>
    );
}

export default Product;