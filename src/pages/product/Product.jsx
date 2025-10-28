import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../features/appContext/AppContext";

export default function Product() {
    const {slug} = useParams();
    const [product, setProduct] = useState({price:0});
    const {request} = useContext(AppContext)

    useEffect(() => {
        request("api://product/" + slug)
        .then(setProduct);
    }, []);

    return <>
    <h1>Сторінка товару {product.name}</h1>
    <div className="row">
        <div className="col col-4">
            <img className="w-100" src={product.imageUrl} alt={product.name} />
        </div>
        <div className="col col-6">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <strong>₴ {product.price.toFixed(2)}</strong>
        </div>
        <div className="col col-2">
            Місце здається під рекламу
        </div>
    </div>
    
    </>;
}
/*
Додати до сторінки товару відомості про "подібні товари"
- додати метод DataAccessor::getRelativeProducts(Product)
   який повертатиме три товари за будь-яким алгоритмом (у т.ч. випадковим)
- включити одержані дані до відповіді сервера на запит товару
- зобразити на сторінці товару маленькі картки в низу сторінки   

Додати до сторінки товару кнопку "До кошику", реалізувати її роботу, аналогічно до 
картки товару на сторінці групи
*/
