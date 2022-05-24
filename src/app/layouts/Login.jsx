import React, {useState} from "react";
import LoginForm from "../component/ui/LoginForm";
import {useParams} from "react-router-dom";
import RegisterForm from "../component/ui/RegisterForm";


const Login = () => {

    const {type} = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");

    const toggleFormType = () => {
        setFormType((prevState) => prevState === "register" ? "login" : "register");
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className={"col-md-6 offset-md-3 shadow p-4"}>
                    {formType === "register" ?
                        <>
                            <h3 className={"mb-4"}>Registration</h3>
                            <RegisterForm/>
                            <p>
                                Already have account?
                                <a role={"button"} onClick={toggleFormType} className={"primary text-decoration-none p-1"}>
                                    Sign In
                                </a>
                            </p>
                        </> :
                        <>
                            <h3 className={"mb-4"}>Login</h3>
                            <LoginForm/>
                            <p>
                                Dont have account?{" "}
                                <a role={"button"} onClick={toggleFormType} className={"primary text-decoration-none"}>
                                    {" "}
                                    Sign Up
                                </a>
                            </p>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;
