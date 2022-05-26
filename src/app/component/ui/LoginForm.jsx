import React, {useEffect, useState} from "react";
import {validator} from "../../utils/validator";
import TextField from "../common/form/TextField";
import CheckBoxField from "../common/form/CheckBoxField";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({email: "", password: "", stayOn: false});
    const navigate = useNavigate();
    const {logIn} = useAuth();
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);

    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);
    }


    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    }


    useEffect(() => {
        validate();
    }, [data])


    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await logIn(data);
            navigate("/", {replace: true});
        } catch (error) {
            setEnterError(error.message);
        }
    }
    const handleCheckBoxChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    onChange={handleChange}
                    name={"email"}
                    label={"Электронная почта"}
                    value={data.email}
                    error={errors.email}
                />
                <TextField
                    onChange={handleChange}
                    name={"password"}
                    type={"password"}
                    label={"Пароль"}
                    value={data.password}
                    error={errors.password}
                />
                <CheckBoxField
                    value={data.stayOn}
                    onChange={handleCheckBoxChange}
                    name={"stayOn"}
                >
                    Оставаться в системе
                </CheckBoxField>
                {enterError && <p className="text-danger">{enterError}</p>}
                <button type={"submit"} disabled={!isValid || enterError} className={"btn btn-primary w-100 mx-auto"}>Submit</button>
            </form>
        </>
    );
};

export default LoginForm;
