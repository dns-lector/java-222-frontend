import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../features/appContext/AppContext";

export default function Product() {
    const {slug} = useParams();
    const [product, setProduct] = useState({price:0});
    const {cart, request, addToCart} = useContext(AppContext)

    useEffect(() => {
        request("api://product/" + slug)
        .then(setProduct);
    }, []);
    
    const addToCartClick = () => {
        addToCart(product);
    }

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
            <br/>
            {cart.cartItems.some(ci=>ci.productId == product.id)
                ? <Link to="/cart" className="btn btn-success">
                    <i className="bi bi-cart-check">Переглянути</i>
                </Link>
                : <button onClick={addToCartClick} className="btn btn-outline-success">
                    <i className="bi bi-cart-plus">До кошику</i>
                </button>}
        </div>
        <div className="col col-2">
            <div className="border p-2 mt-2">Місце здається під рекламу</div>

            {product.rates && product.rates.map(r => <div key={r.id} className="border p-2 mt-2">
                {r.createdAt.substring(0,5)}&thinsp;
                <a href={"mailto:" + r.user.email} title={r.user.name + ' ' + r.user.email}>
                    {r.user.name.split(' ').map(x => x.substring(0,1)).join('')}
                </a>&thinsp;
                Коментар: {r.text && r.text.length > 0
                    ? <i>{r.text}</i>
                    : <span title="Немає коментаря">--</span>}
                <br/>
                Оцінка: {r.rateStars > 0 
                    ? <b>{r.rateStars}</b> 
                    : <span title="Немає оцінки">--</span>}  
            </div>)}
        </div>
    </div>
    
    </>;
}
/*
Д.З. Реалізувати виведення (відображення) дробних середніх оцінок
шляхом "зафарбовування" частини зірки-оцінки
Додати скріншоти до звіту з ДЗ
*/
