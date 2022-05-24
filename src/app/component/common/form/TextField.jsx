import React, {useState} from "react";

const TextField = ({onChange, label, type = "text", name, value, error}) => {

    const [showPassword, setShowPassword] = useState(false);

    const getInputClasses = () => {
        return "form-control " + (error ? "is-invalid" : "is-valid");
    }
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    }

    return (
        <div className={"mb-4"}>
            <label htmlFor={name}>{label}</label>
            <div className={"input-group has-validation"}>
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    value={value}
                    onChange={onChange}
                    name={name}
                    className={getInputClasses()}
                />
                {type === "password" &&
                <button type="button" onClick={toggleShowPassword} className={"btn " + (error ? "btn-outline-danger" : "btn-outline-success")}>
                    {
                        <i className={"bi bi-eye" + (showPassword ? "" : "-slash")}></i>
                    }
                </button>}

                {error ? <div className={"invalid-feedback"}>{error}</div> :
                    <div className={"valid-feedback"}>Готово!</div>}
            </div>
        </div>
    );
};

export default TextField;
