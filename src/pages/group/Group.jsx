import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../features/appContext/AppContext";

export default function Group() {
    const {slug} = useParams();
    const [group, setGroup] = useState({});
    const {request} = useContext(AppContext);

    useEffect(() => {
        request("api://groups/" + slug).then(setGroup);
    }, []);

    return <>
    <h1>Розділ {group.name}</h1>
    
    {group.products != null && <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4  row-cols-xxl-5 g-4">
     {group.products.map(p => <div className="col" key={p.id}>
                 <Link className="h-100 nav-link" to={"/product/" + (p.slug || p.id)}>
                     <div className="card h-100">
                         <img src={p.imageUrl} className="card-img-top" alt={p.name} />
                         <div className="card-body">
                             <h5 className="card-title">{p.name}</h5>
                             <p className="card-text">{p.description}</p>
                         </div>
                     </div>
                 </Link>
             </div>)}
    </div>}
    </>;
}