import React, {useEffect, useState} from "react";
import {validator} from "../../utils/validator";
import TextField from "../common/form/TextField";
import SelectField from "../common/form/SelectField";
import RadioField from "../common/form/RadioField";
import MultiSelectField from "../common/form/MultiSelectField";
import CheckBoxField from "../common/form/CheckBoxField";
import {useQualities} from "../../hooks/useQualities";
import {useProfessions} from "../../hooks/useProfession";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {

    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const navigate = useNavigate();
    const { signUp } = useAuth();
    const {qualities} = useQualities();
    const qualitiesList = qualities.map(q => ({label: q.name, value: q._id}));
    const {professions} = useProfessions();
    const professionsList = professions.map(p => ({label: p.name, value: p._id}))
    const [errors, setErrors] = useState({});

    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }


    const handleMultiSelectChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }
    const handleCheckBoxChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }


    const onInputChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }


    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message: "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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
        const newData = {...data, qualities: data.qualities.map(q => q.value)}


        try {
            await signUp(newData);
            navigate("/", {replace: true});
        } catch (error) {
            setErrors(error);
        }
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
                <SelectField
                    onChange={onInputChange}
                    value={data.profession}
                    label={"Выберите вашу профессию"}
                    error={errors.profession}
                    defaultOption={"Choose..."}
                    options={professionsList}
                    name={"profession"}
                />
                <RadioField
                    label={"Выберите ваш пол"}
                    options={[{name: "Male", value: "male"}, {name: "Female", value: "female"}, {
                        name: "Other",
                        value: "other"
                    }]}
                    onChange={handleChange}
                    value={data.sex}
                    name={"sex"}
                />
                <MultiSelectField
                    options={qualitiesList}
                    onChange={handleMultiSelectChange}
                    name={"qualities"}
                    defaultValue={data.qualities}
                    label={"Введите ваши качества"}
                />
                <CheckBoxField
                    value={data.licence}
                    onChange={handleCheckBoxChange}
                    name={"licence"}
                    error={errors.licence}
                >
                    Подтвердите <a>лицензионное соглашение</a>
                </CheckBoxField>
                <button type={"submit"} disabled={!isValid} className={"btn btn-primary w-100 mx-auto"}>Submit</button>
            </form>
        </>
    );
};

export default RegisterForm;
