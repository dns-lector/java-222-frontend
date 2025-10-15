import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/appContext/AppContext";

export default function Home() {
    const {token} = useContext(AppContext);
    const [groups, setGroups] = useState([]);

    const loadGroups = () => {
        fetch("http://localhost:8080/JavaWeb222/groups")
        .then(r => r.json()).then(setGroups);
    };

    useEffect(() => {
        loadGroups();
    }, []);

    return <>
    <div style={{width:"100%", height:"25vh", overflow: "hidden", margin: "10px 0"}}>
        <img src="/img/logo.jpg" className="w-100" />
    </div>
    
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4  row-cols-xxl-5 g-4">
        {groups.map(g => <div className="col" key={g.id}>
            <div className="card h-100">
            <img src={g.imageUrl} className="card-img-top" alt={g.name} />
            <div className="card-body">
                <h5 className="card-title">{g.name}</h5>
                <p className="card-text">{g.description}</p>
            </div>
            </div>
        </div>)}
    </div>        
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