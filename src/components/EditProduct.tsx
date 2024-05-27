import axios from 'axios';
import {ChangeEvent, useEffect, useState, MouseEvent, useRef} from 'react';
import {useParams} from 'react-router-dom';
import { Product } from '../model/Product';


function EditProduct(){

    const params = useParams();
    const [product, setProduct] = useState<Product>(new Product(0, "", 0, ""));
    const nameInputRef = useRef<HTMLInputElement>(null);
    

    useEffect(() => {

        nameInputRef.current?.focus();
        fetchProduct();


    }, [])
    async function fetchProduct(){
        
        try {
            const response = await axios.get<Product>(`http://localhost:9000/products/${params.id}`);
            setProduct(response.data);
        } catch (error) {
            
        }
    }
    function handleChangeName(evt: ChangeEvent<HTMLInputElement>){

        // const updateValue = evt.target.value;
        // const copyOfProduct = {...product};
        // copyOfProduct.name = updateValue;
        // setProduct(copyOfProduct);

        setProduct({...product, name: evt.target.value});
    }
    function handleChangePrice(evt: ChangeEvent<HTMLInputElement>){
        setProduct({...product, price: Number(evt.target.value)});
    }
    function handleChangeDesc(evt: ChangeEvent<HTMLInputElement>){
        setProduct({...product, description: evt.target.value});
    }

    async function save(e: MouseEvent<HTMLButtonElement>){

        e.preventDefault();
        try {

            const response = await axios.put(`http://localhost:9000/products/${params.id}`, product);
            alert("Product updated successfully");


        } catch (error) {
            alert("Error updating product");
        }
    }

    return (
        <div>
            <h4>Edit Product</h4>

            <form>
                <div className="form-group">
                    <label>Name</label>
                    <input ref={nameInputRef} className="form-control" id="name" 
                                    placeholder="Name" value={product.name}
                                    onChange={handleChangeName}/>
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input type="number" className="form-control" id="price" 
                                    placeholder="Price" value={product.price}
                                    onChange={handleChangePrice}/>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input className="form-control" id="desc" 
                                    placeholder="Description" value={product.description}
                                    onChange={handleChangeDesc}/>
                </div>
                <br/>
                <div>
                    <button className="btn btn-primary" onClick={save}>Save</button>&nbsp;
                    <button className="btn btn-warning">Cancel</button>
                </div>
            </form>
        </div>
    )

}

export default EditProduct;