import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../features/appContext/AppContext";
import ProductCard from "../../entities/product/ui/ProductCard";

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
     {group.products.map(p => <ProductCard product={p} key={p.id} />)}
    </div>}
    </>;
}

