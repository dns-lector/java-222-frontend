import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppContext from "../../features/appContext/AppContext";
import './ui/History.css';

const _initialCart = {cartItems: []};

export default function History() {
    const {request, user, updateCart} = useContext(AppContext);
    const {cartId} = useParams();
    const navigate = useNavigate();
    const [_cart, _setCart] = useState(_initialCart);

    useEffect(() => {
        if(user && cartId) {
            request("api://cart/" + cartId).then(data => {
                // console.log(data);
                if(data) {
                    _setCart(data);
                }
                else {
                    _setCart(_initialCart);
                }
            });
        }
        else {
            _setCart(_initialCart);
        }
    }, [user, cartId]);

    const repeatClick = () => {
        request("api://cart/" + cartId, {
            method: "LINK"
        }).then(_ => {
            updateCart();
            if(confirm("Замовлення додане до кошику.\nПерейти на сторінку кошику?")) {
                navigate("/cart");
            }
        });
    };

    return <>
        <h1 className="display-5 my-3">Історія покупки від {_cart.createdAt}</h1>
        <div className="row">
            <div className="col offset-0 offset-lg-1 offset-xxl-2 col-12 col-lg-10 col-xxl-8">
                {_cart.cartItems.length > 0 && <>
                    <div className="row mb-3 bg-body-tertiary border-bottom py-2">
                        <div className="col col-7">Товар </div>
                        <div className="col col-2 text-center">Ціна</div>
                        <div className="col col-1 text-center">Кількість</div>
                        <div className="col col-2 text-center">Сума</div>
                    </div>
                    {_cart.cartItems.map(cartItem => <CartItemRow key={cartItem.id} cartItem={cartItem} />)}
                    <div className="row mb-3 bg-body-tertiary  py-2">
                        <div className="v-center col col-2">
                            <button onClick={repeatClick} className="btn btn-outline-success" title="Повторити замовлення">
                                <i className="bi bi-repeat"></i>
                            </button>
                        </div>
                        <div className="col col-5"></div>
                        <div className="v-center col col-2 text-center">Разом: </div>
                        <div className="v-center col col-1 text-center">{_cart.cartItems.reduce((s, ci) => s + ci.quantity, 0)}</div>
                        <div className="v-center col col-2 text-center">{_cart.price}</div>
                    </div>
                </>}
            </div>
        </div>


    </>;
}

function CartItemRow({cartItem}) {

    const [comment, setComment] = useState("");

    const rateClick = () => {
        const ciId = cartItem.id;
        const productId = cartItem.product.id;
        const rateInput = document.querySelector(`[name="${ciId}"]:checked`);
        let rate = 0;
        if(rateInput) rate = rateInput.value;

        if(rate || comment) {
            fetch("api://rate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    ciId,
                    productId,
                    rate,
                    comment
                })
            }).then(console.log);
        }
        else {
            alert("Потрібно зазначити або коментар, або оцінку");
        }
        //console.log(ciId, productId, comment, rate);
    };

    return <div className="row mt-3 border-bottom pb-3">
        <div className="col col-2">
            <Link className="w-100" to={"/product/" + (cartItem.product.slug || cartItem.product.id)}>
                <img className="w-100" src={cartItem.product.imageUrl} alt={cartItem.product.name} />
            </Link>
        </div>
        <div className="col col-5">
            <b className="fs-5" title={cartItem.product.description}>{cartItem.product.name}</b>
            
            <div className="border p-2 mt-2">
                <input type="text" placeholder="Відгук" className="w-100" 
                    value={comment} onChange={e => setComment(e.target.value)}/>
                <div className="d-flex justify-content-between mt-2">
                    <div className="radio-container">
                    <input type="radio" value="5" name={cartItem.id} id={cartItem.id +"_1"} /><label htmlFor={cartItem.id +"_1"}>★</label>
                    <input type="radio" value="4" name={cartItem.id} id={cartItem.id +"_2"} /><label htmlFor={cartItem.id +"_2"}>★</label>
                    <input type="radio" value="3" name={cartItem.id} id={cartItem.id +"_3"} /><label htmlFor={cartItem.id +"_3"}>★</label>
                    <input type="radio" value="2" name={cartItem.id} id={cartItem.id +"_4"} /><label htmlFor={cartItem.id +"_4"}>★</label>
                    <input type="radio" value="1" name={cartItem.id} id={cartItem.id +"_5"} /><label htmlFor={cartItem.id +"_5"}>★</label>
                </div>
                <button onClick={rateClick} className="btn btn-outline-info"><i className="bi bi-send-check"></i></button>
                </div>
                
            </div>

        </div>
        <div className="col col-2 text-center">{cartItem.product.price}</div>
        <div className="col col-1 text-center">{cartItem.quantity}</div>
        <div className="col col-2 text-center">{cartItem.price}</div>
    </div>;
}
/*
Д.З. Функція повторення замовлення:
 Реалізувати перевірку того, що в користувача вже є відкритий кошик
 і він не порожній. Якщо так, то виводити попередження
 "Вміст замовлення буде додано до вашого кошику (Так, Ні)"

 Якщо кошику немає або він порожній, то виводити
 "Замовлення буде повторене (Так, Ні)"

 * У неавторизованому режимі на сторінці /history виводити
   попередження, як і на профілі, про необхідність входу до сайту
*/