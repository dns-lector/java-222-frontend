import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../../features/appContext/AppContext";

export default function ProductCard({product}) {
    const {cart, user, request, updateCart} = useContext(AppContext);

    const addToCartClick = (e) => {
        e.preventDefault();
        if(user == null) {
            alert("Увійдіть у систему для здійснення покупок");
            return;
        }
        request("api://cart?product-id=" + product.id, {
            method: "POST",
        }).then(updateCart)
        .catch(console.log);
    }

    return <div className="col">
            <div className="card h-100">
                <Link className="h-100 nav-link" to={"/product/" + (product.slug || product.id)}>
                    <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                    </div>
                </Link>
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <span>
                        ₴ {product.price.toFixed(2)}
                    </span>
                    {cart.cartItems.some(ci=>ci.productId == product.id)
                    ? <Link to="/cart" className="btn btn-success">
                        <i className="bi bi-cart-check"></i>
                    </Link>
                    : <button onClick={addToCartClick} className="btn btn-outline-success">
                        <i className="bi bi-cart-plus"></i>
                    </button>}
                    
                </div>
            </div>
    </div>;
}