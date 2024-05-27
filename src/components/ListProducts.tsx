import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../model/Product';
import './ListProducts.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ListProducts() {

    const [products, setProducts] = useState<Array<Product>>([]);
    //let products: Array<Product> = [new Product(1, "abc", 70000, "some desc")];

    const navigate = useNavigate();
    const auth = useSelector((state: any) => state.auth);

    //useEffect(callback, [list of dependencies]);
    useEffect(() => {

        console.log("ListProducts Mounted...");
        fetchProductsAsync();

        //callback invoked on unmount
        return () => {
            console.log("ListProducts Unmounted...");
        }

    }, []);

    //invoked when the dependecy(products) changes
    useEffect(() => {
        console.log("products updated", products);
    }, [products])



    async function fetchProductsAsync() {

        try {

            // const headers = {"Authorization": `Bearer ${auth.accessToken}`};
            // const response = await axios
            //     .get<Array<Product>>(
            //         "http://localhost:9000/secure_products", { headers });
            
            //Headers are not being sent, sent in the axios interceptors
            const response = await axios
                .get<Array<Product>>(
                    "http://localhost:9000/secure_products");
            console.log("success", response);
            setProducts(response.data);
        }
        catch (error) {
            console.log("error", error);
        }
    }

    function fetchProducts() {

        // const promise = axios.get<Array<Product>>("http://localhost:9000/products");
        // //promise.then(successCallback, errorCallback)
        // promise.then((response) => {

        //     console.log("success", response);
        //     setProducts(response.data);
        //     // products = response.data;
        //     // console.log("products", products);

        // }, (error) => {

        //     console.log("error", error);
        // })

        axios
            .get<Array<Product>>("http://localhost:9000/products")
            .then((response) => {
                console.log("success", response);
                setProducts(response.data);
                // products = response.data;
                // console.log("products", products);
            }, (error) => {
                console.log("error", error);
            })

    }
    async function deleteProduct(product: Product) {

        try {
            debugger;
            const response = await axios.delete(`http://localhost:9000/secure_products/${product.id}`);
            alert(`Product with id: ${product.id} deleted`);
            //fetchProductsAsync();

            const copyOfProducts = [...products];
            const indexofElementToDelete = copyOfProducts.findIndex(item => item.id === product.id);
            if (indexofElementToDelete !== -1) {

                copyOfProducts.splice(indexofElementToDelete, 1);
                setProducts(copyOfProducts);
            }



        } catch (error) {
            alert(`Product with id: ${product.id} not found`);
        }

    }

    function editProduct(product: Product) {

        navigate(`/products/${product.id}`)
    }
    return (
        <div>
            <h4>List Products</h4>

            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
                {products.map((item) => {

                    return (
                        // <ProductView value{item} onDelete={deleteProduct} onEdit={editProduct}/>
                        <div className='product' key={item.id}>
                            <p>Id: {item.id}</p>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{item.description}</p>
                            <div>
                                <button onClick={() => { deleteProduct(item) }}>Delete</button>&nbsp;
                                <button onClick={() => { editProduct(item) }}>Edit</button>
                            </div>
                        </div>
                    );

                })}
            </div>


        </div>


    )
}

export default ListProducts;