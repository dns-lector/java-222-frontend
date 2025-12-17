import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../features/appContext/AppContext";
import ProductCard from "../../entities/product/ui/ProductCard";

export default function Group() {
    const {slug} = useParams();
    const [group, setGroup] = useState({});
    const [pageNum, setPageNum] = useState(1);
    const [lastPageNum, setLastPageNum] = useState(1);
    const {request} = useContext(AppContext);


    useEffect(() => {
        request(`api://groups/${slug}?page=${pageNum}&perpage=5`, {}, true)
        .then((j) => {
            // console.log(j.meta);
            setGroup(j.data);
            setLastPageNum(j.meta.pagination.lastPage);
        });
    }, [slug, pageNum]);

    return <>
    <h1>Розділ {group.name}</h1>
    
    {group.products != null && <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4  row-cols-xxl-5 g-4">
     {group.products.map(p => <ProductCard product={p} key={p.id} />)}
    </div>}
        {lastPageNum > 1 &&
            <div className="w-100 d-flex justify-content-center my-5">
                <Paginator 
                    pageNum={pageNum} 
                    setPageNum={setPageNum} 
                    lastPageNum={lastPageNum} />
            </div>}
    
    </>;
}

function Paginator({pageNum, setPageNum, lastPageNum}) {
    const p1num = pageNum != lastPageNum || lastPageNum == 2 ? pageNum - 1 : pageNum - 2;
    const p2num = pageNum == 1 ? 2 : pageNum == lastPageNum ? lastPageNum - 1 : pageNum ;
    const p3num = pageNum != 1 || lastPageNum == 2 ? pageNum + 1 : pageNum + 2;

    return <nav aria-label="..." className="m-auto">
  <ul className="pagination">
    {pageNum == 1 
    ? <>
        <li className="page-item disabled"><span className="page-link" ><i className="bi bi-skip-backward"></i></span></li>
        <li className="page-item disabled"><span className="page-link" style={{transform:"scaleX(-1)"}}><i className="bi bi-fast-forward" ></i></span></li>
    </>
    : <>
        <li className="page-item"><span role="button" className="page-link" onClick={()=>setPageNum(1)}><i className="bi bi-skip-backward"></i></span></li>
        <li className="page-item"><span role="button" className="page-link" onClick={()=>setPageNum(pageNum - 1)} style={{transform:"scaleX(-1)"}}><i className="bi bi-fast-forward" ></i></span></li>
    </>}
    
    {pageNum == 1 
    ? <li className="page-item active"><span className="page-link">1</span></li>
    : <li className="page-item"><span className="page-link" role="button" 
          onClick={()=>setPageNum(p1num)}>{p1num}</span></li>}


    {lastPageNum > 2 && 
        <li className={"page-item" + (pageNum == p2num ? " active" : "")}>
            <span 
                role={pageNum == p2num ? undefined : "button"}
                onClick={pageNum == p2num ? undefined : () => setPageNum(p2num)}
                className="page-link" 
                aria-current="page">{p2num}</span>
        </li>
    }


    {pageNum == lastPageNum 
    ? <li className="page-item active"><span className="page-link">{lastPageNum}</span></li>
    : <li className="page-item"><span className="page-link" role="button" 
          onClick={()=>setPageNum(p3num)}>{p3num}</span></li>}
    
    {pageNum == lastPageNum 
    ? <>
        <li className="page-item disabled"><span className="page-link"><i className="bi bi-fast-forward"></i></span></li>
        <li className="page-item disabled"><span className="page-link"><i className="bi bi-skip-forward"></i></span></li>
    </>
    : <>
        <li className="page-item"><span className="page-link" role="button" onClick={()=>setPageNum(pageNum + 1)}><i className="bi bi-fast-forward"></i></span></li>
        <li className="page-item"><span className="page-link" role="button" onClick={()=>setPageNum(lastPageNum)}><i className="bi bi-skip-forward"></i></span></li>
    </>}
    
  </ul>
</nav>
}

/*
 <<  <  1 2 3 4 5  >  >>
 
 1 ... 8 9 10 ... 52

 Д.З. Впровадити інструменти вибору кількості елементів на 
 одній сторінці (у вигляді декількох фіксованих кнопок, 
 наприклад, [2], [4], [6]). Реалізувати реагування пагінатора
 на зміни зазначеної кількості
*/