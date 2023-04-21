import { useState } from 'react'
import axios from 'axios'
import { Router, useRouter } from 'next/router'

export default function ProductForm ({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images,
    }){
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title,description,price};
        if (_id){
            await axios.put('/api/products', {...data,_id});
        } else {
        await axios.post('/api/products', data);
    }
    setGoToProducts(true)
}
    if (goToProducts){
        router.push('/products')
    }
    async function uploadImages(ev){
        const files = ev.target?.files;
        if (files.length > 0){
            const data = new FormData();
            for (const file of files){
                data.append('file', file)
            }
            const res = await fetch('/api/upload',{
                method: 'POST',
                body: data,
            })
            console.log(res)
        }  
    }
    return(
        <form onSubmit={saveProduct}>
            
            <label className=''>Product Name:</label>
            <input type="text" placeholder="Product Name" value={title} onChange={ev => setTitle(ev.target.value)}/>
            <label className=''>Price:</label>
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)}/>
            <label className=''>Description:</label>
            <textarea placeholder='Description' value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
            <label>Images:</label>
            <div className='mt-2'>
                    <label className='w-64 h-64 border-2 flex justify-center items-center text-gray-400 rounded-lg bg-gray-100 gap-1 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8  h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                        </svg>
                            <div>
                                Upload
                            </div>
                            <input type="file" className='hidden' onChange={uploadImages}/>
                    </label>
                {!images?.length &&(
                    <div className='mt-4 mb-4'>
                        No Images for this Product
                    </div>
                )}
            </div>
            <button className='pr-3 pl-3 pt-1 pb-1 bg-blue-400 rounded-lg'>Save</button>
        </form>
    )
}