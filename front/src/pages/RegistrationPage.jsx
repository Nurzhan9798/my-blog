import React from 'react';
import {useInput} from "../hooks/useInput";

const RegistrationPage = (props) => {

    const username = useInput("");
    const password = useInput("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username.value);
        console.log(password.value);
    }

    return (
        <div className="login">
            <div className="login__container container">
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" className="form__input" placeholder="username" {...username}/>
                    <input type="password" className="form__input" placeholder="password" {...password}/>
                    <button className="form__button">Register</button>
                </form>
            </div>

        </div>

    );
}

export default RegistrationPage;