import React from "react";

const CheckBoxField = ({name, value, onChange, children, error}) => {

    const handleChange = () => {
        console.log("value = ", value)
        onChange({name: name, value: !value});
    }

    return (
        <div className={"form-check mb-4"}>
            <input
                className={"form-check-input"}
                type={"checkbox"}
                value={""}
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label className={"form-check-label is-invalid"} htmlFor={"flexCheckDefault"}>
                {children}
            </label>
            {error && <div className={"invalid-feedback"}>{error}</div>}
        </div>
    );
};

export default CheckBoxField;