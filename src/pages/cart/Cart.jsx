import { useContext } from "react";
import AppContext from "../../features/appContext/AppContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
    const { cart, request, updateCart } = useContext(AppContext);
    const navigate = useNavigate()

    const buyCartClick = () => {
        if(confirm("Підтвердити покупку?")) {   // TODO: включити в текст кількість товарів та ціну замовлення
            request(`api://cart`, {
                method: 'PUT'
            })
            .then(() => {
                updateCart();
                alert("Дякуємо за покупку!");
            })
            .catch(alert);
        }
    };
    /*
    Модифікувати роботу функції buyCartClick
    Включити до повідомлення кількість товарів та ціну замовлення
    Додати повідомлення у разі негативної відповіді сервера "Операція не виконана, повторіть пізніше"
    */

    return <>
    <h1 className="display-5 my-3">Мій кошик</h1>

    <button onClick={() => navigate("/")} className="btn btn-primary">
        Продовжити покупки
    </button>

    {(!cart || cart.cartItems.length == 0)
    ? <EmptyCart />
    : <>
    <div className="row mb-3 bg-body-tertiary border-bottom py-2">
        <div className="col col-6">Товар </div>
        <div className="col col-1">Ціна</div>
        <div className="col col-3 text-center">Кількість</div>
        <div className="col col-1">Сума</div>
    </div>
    {cart.cartItems.map(ci => <CartItem key={ci.id} cartItem={ci} />)}
    <div className="row mb-3 bg-body-tertiary  py-2">
        <div className="v-center col col-7 text-end">Разом: </div>
        <div className="v-center col col-3 text-center">{cart.cartItems.reduce((s, ci) => s + ci.quantity, 0)}</div>
        <div className="v-center col col-1">{cart.price}</div>
        <div className="v-center col col-1">
            <button onClick={buyCartClick} className="btn btn-outline-success" title="Оформити покупку">
                <i className="bi bi-cart-check"></i>
            </button>
        </div>
    </div>

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
        if(confirm(`Підтверджуєте видалення позиції '${cartItem.product.name}' ${cartItem.quantity} шт?`)) {
            request(`api://cart?cart-item-id=${cartItem.id}`, {
                method: 'DELETE'
            })
            .then(updateCart)
            .catch(alert);
        }
    };
    
    return <div className="row mt-3 border-bottom pb-3">
        <div className="col col-1">
            <Link className="w-100" to={"/product/" + (cartItem.product.slug || cartItem.product.id)}>
                <img className="w-100" src={cartItem.product.imageUrl} alt={cartItem.product.name} />
            </Link>
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
        <div className="col col-1 text-center">
            <i onClick={deleteClick} role="button" className="bi bi-x-lg"></i>
        </div>
    </div>;
}

function EmptyCart() {
    return <>
    <p>Кошик порожній</p>
    </>;
}