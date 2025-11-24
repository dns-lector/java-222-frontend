import { useContext, useRef } from "react";
import AppContext from "../../features/appContext/AppContext";
import Base64 from "../../shared/base64/Base64";

export default function AuthModal() {
    const { request, setToken } = useContext(AppContext);
    const closeButtonRef = useRef();

    const onAuthSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const login = formData.get("auth-login");
        const password = formData.get("auth-password");
        console.log(login, password);
        // RFC 7617
        const userPass = login + ':' + password;
        const credentials = Base64.encode(userPass);
        request("api://user", {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + credentials,
            }
        }).then(jwt => {
            console.log(jwt);
            setToken(jwt);
            closeButtonRef.current.click();
        })
        .catch(() => alert("У вході відмовлено"));
    };

    return <div className="modal fade" id="authModal" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="authModalLabel">Вхід до сайту</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={onAuthSubmit} id="auth-form">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="login-addon"><i className="bi bi-key"></i></span>
                            <input name="auth-login" type="text" className="form-control" placeholder="Логін" aria-label="Логін" aria-describedby="login-addon"/>
                        </div>
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="password-addon"><i className="bi bi-unlock2"></i></span>
                            <input name="auth-password" type="password" className="form-control" placeholder="Пароль" aria-label="Пароль" aria-describedby="password-addon"/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button ref={closeButtonRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Скасувати</button>
                    <button type="submit" form="auth-form" className="btn btn-primary">Вхід</button>                    
                </div>
                </div>
            </div>
        </div>;
}