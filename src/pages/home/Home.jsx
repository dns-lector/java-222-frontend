import { useContext, useState } from "react";
import AppContext from "../../features/appContext/AppContext";

export default function Home() {
    const {token} = useContext(AppContext);
    const [content, setContent] = useState("");

    const onPost = () => {
        let headers = {
            'Content-Type': "application/json"
        };
        if(token) {
            headers["Authorization"] = "Bearer " + token;
        }
        fetch("http://localhost:8080/JavaWeb222/user", {
            method: 'POST',
            headers: headers
        }).then(r => r.json()).then(j => setContent(JSON.stringify(j)));
    };

    const invalid1 = () => {
        fetch("http://localhost:8080/JavaWeb222/user", {
            method: 'POST',
            headers: {
                "Authorization": "Brr 123"
            }
        }).then(r => r.json()).then(j => setContent(JSON.stringify(j)));
    };
    const invalid2 = () => {
        fetch("http://localhost:8080/JavaWeb222/user", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer 1-2-3"
            }
        }).then(r => r.json()).then(j => setContent(JSON.stringify(j)));
    };
    const invalid3 = () => {
        fetch("http://localhost:8080/JavaWeb222/user", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer 1.2.3"
            }
        }).then(r => r.json()).then(j => setContent(JSON.stringify(j)));
    };


    return <>
        <h1>Home Page</h1>
        <button onClick={onPost} type="button" className="btn btn-secondary">POST</button>
        <button onClick={invalid1} type="button" className="btn btn-warning ms-1">Invalid scheme</button>
        <button onClick={invalid2} type="button" className="btn btn-warning ms-1">Invalid structure</button>
        <button onClick={invalid3} type="button" className="btn btn-warning ms-1">Invalid data</button>

        {content && <div className="alert alert-primary" role="alert">{content}</div>}
    </>;
}
/*
Д.З. Розширити набір інструментів для тестування неправильно переданих даних авторизації:
- символи, що не допускаються в Base64
- розширена неправильна структура токена (більше за 2 точки)
- порожні складові частини (нічого між точками: .2.3, 1..3, ..3, 1..)
- помилково написаний заголовок: Authorizatoin і т.п.
- два чи більше пробілів від схеми: Authorization: Bearer    1.2.3
*/