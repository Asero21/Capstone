import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage (){
    const router = useRouter()
    const {id} = router.query;
    const [productInfo, setProductInfo] = useState()
    useEffect(() => {
        if (!id) {
          return;
        }
        axios.get('/api/products?id='+id).then(response => {
          setProductInfo(response.data);
        });
      }, [id]);
      function goBack() {
        router.push('/products');
      }
      async function deleteProduct() {
        await axios.delete('/api/products?id='+id);
        goBack();
      }
    return(
        <Layout>
            <div>         
                <h1 className="text-red-700 text-xl">Do you really want to delete "{productInfo?.title}" ?</h1>
                <div className="flex gap-1">
                    <button 
                        onClick={deleteProduct}
                        className="btn-red">
                            Yes
                    </button>
                    <button 
                        className="btn-default" 
                        onClick={goBack}>
                            No
                    </button>
                </div>
            </div>
        </Layout>
    )
}