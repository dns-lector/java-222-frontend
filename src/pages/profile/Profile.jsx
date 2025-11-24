import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/appContext/AppContext";
import { Link } from "react-router-dom";
import './ui/Profile.css';

const emptyUserData = {
    role: {},
    user: {},
    login: null,
    carts: []
};

export default function Profile() {
    const {request, user} = useContext(AppContext);
    const [userData, setUserData] = useState(emptyUserData);

    useEffect(() => {
        if(user) {
            request("api://user/profile").then(setUserData);
            // .then(console.log)
        }
        else {
            setUserData(emptyUserData);
        }
    }, [user]);

    return !user ? <div class="alert alert-danger mt-5 text-center" role="alert">Профіль доступний після входу в систему</div>
    :<>
        <h1 className="display-5 my-3">Мій профіль</h1>
        <div className="row">
            <div className="col">
                {userData.login},
                {userData.user.name}
            </div>
            <div className="col">
                <h2>Історія покупок</h2>
                <div className="list-group">
                    {userData.carts.map(cart => <Link key={cart.id} to={cart.paidAt || cart.deletedAt ? "/history/" + cart.id : "/cart"} 
                        className={"list-group-item list-group-item-action " + (cart.paidAt ? "cart-paid" : (cart.deletedAt ? "cart-deleted" : "cart-active"))}>
                        {new Date(cart.createdAt).toLocaleString()} {cart.cartItems.length}
                    </Link>)}
                </div>
            </div>
        </div>
    </>;
}
/*
Д.З. У віджеті з історією покупок додати інформацію про вартість замовлення
та вивести розширені дані:
дата: 3 позиції (5 товарів) на 1232 грн
** при наведенні видавати короткі відмості (у підказці) назва товару - кількість
*/