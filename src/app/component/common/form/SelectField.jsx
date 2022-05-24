import React from "react";

const SelectField = ({label, value, onChange, defaultOption, options, error, name}) => {

    const getInputClasses = () => {
        return "form-select " + (value === "" ? "is-invalid" : "is-valid");
    }

    const optionsArray = !Array.isArray(options) && typeof options === "object" ?
        Object.keys(options).map(optionName => ({
            name: options[optionName].name,
            value: options[optionName]._id
        })) : options

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            >
                <option disabled value="">{defaultOption}</option>
                {
                    optionsArray && optionsArray.map((option) => <option
                            key={option.value}
                            value={option.value}>
                            {option.name}
                        </option>
                    )
                }
                {/*{*/}
                {/*    Array.isArray(options) ?*/}
                {/*        options && options.map((profession) => <option*/}
                {/*            key={profession._id}*/}
                {/*            value={profession._id}>*/}
                {/*            {profession.name}*/}
                {/*        </option>*/}
                {/*        ) : options && Object.keys(options).map((professionName) => <option*/}
                {/*        key={options[professionName]._id}*/}
                {/*        value={options[professionName]._id}>*/}
                {/*        {options[professionName].name}*/}
                {/*    </option>)*/}
                {/*}*/}
            </select>

            {error ?
                <div className="invalid-feedback">
                    {error}
                </div> : <div className={"valid-feedback"}>Готово!</div>}
        </div>
    );
};

export default SelectField;