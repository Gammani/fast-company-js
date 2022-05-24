import React from "react";

const RadioField = ({options, name, onChange, value, label}) => {
    return (
        <div className={"mb-4"}>
            <label htmlFor={name}>{label}</label>
            <div>
                {
                    options.map((option) => (
                        <div className={"form-check form-check-inline"} key={option.name + "_" + option.value}>
                            <input
                                className={"form-check-input"}
                                type={"radio"}
                                name={name}
                                id={option.name + "_" + option.value}
                                checked={option.value === value}
                                value={option.value}
                                onChange={onChange}
                            />
                            <label
                                className={"form-check-label"}
                                htmlFor={option.name + "_" + option.value}
                            >
                                {option.name}
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default RadioField;
