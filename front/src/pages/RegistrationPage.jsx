import React from 'react';
import {useInput} from "../hooks/useInput";

const RegistrationPage = (props) => {

    const username = useInput("");
    const password = useInput("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/registration',
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        username: username.value,
                        password: password.value
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        if (response.status !== 200) {
            alert("error")
        } else {
            alert("success");
        }
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