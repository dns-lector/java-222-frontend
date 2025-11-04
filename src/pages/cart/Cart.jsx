import { useContext } from "react";
import AppContext from "../../features/appContext/AppContext";

export default function Cart() {
    const { cart } = useContext(AppContext);

    return <>
    <h1 className="display-5 my-3">Мій кошик</h1>
    {(!cart || cart.cartItems.length == 0)
    ? <EmptyCart />
    : <>
    <div className="row mb-3 bg-body-tertiary py-2">
        <div className="col col-6">Товар </div>
        <div className="col col-1">Ціна</div>
        <div className="col col-3 text-center">Кількість</div>
        <div className="col col-1">Сума</div>
    </div>
    {cart.cartItems.map(ci => <CartItem key={ci.id} cartItem={ci} />)}
    </>}
    </>;
}

function CartItem({cartItem}) {
    const { request, updateCart } = useContext(AppContext);

    const modify = (inc) => {
        request(`api://cart?cart-item-id=${cartItem.id}&inc=${inc}`, {
            method: 'PATCH'
        })
        .then(updateCart)
        .catch(alert);
    };

    const incClick = () => {
        modify(1);
    };

    const decClick = () => {
        modify(-1);
    };

    const deleteClick = () => {
        console.log(cartItem.id, "x");
    };
    
    return <div className="row mb-3 border-bottom pb-3">
        <div className="col col-1">
            <img className="w-100" src={cartItem.product.imageUrl} alt={cartItem.product.name} />
        </div>
        <div className="col col-5">
            <b className="fs-5">{cartItem.product.name}</b><br/>
            <span className="text-muted fs-6">{cartItem.product.description}</span>
        </div>
        <div className="col col-1">
            {cartItem.product.price} 
        </div>
        <div className="col col-3 text-center">
            <i onClick={decClick} className="bi bi-dash-lg fs-4 me-3" role="button"></i>
            <div style={{"display":"inline-block", "width": "2em", "height": "2em", "paddingTop": ".2em"}} className="border border-dark text-center rounded-circle">{cartItem.quantity}</div>
            <i onClick={incClick} className="bi bi-plus-lg fs-4 ms-3" role="button"></i>
        </div>
        <div className="col col-1">
            {cartItem.price} 
        </div>
        <div className="col col-1">
            <i onClick={deleteClick} role="button" className="bi bi-x-lg"></i>
        </div>
    </div>;
}

function EmptyCart() {
    return <>
    <p>Кошик порожній</p>
    </>;
}