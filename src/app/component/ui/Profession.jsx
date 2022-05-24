import React from "react";
import { useProfessions } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();

    if (!isLoading) {
        const prof = getProfession(id);
        return <p>{prof.name}</p>;
    } else return "loading ...";
};

export default Profession;
