import React from "react";
import Quality from "./Quality";

const QualitiesList = ({qualities}) => {

    return (
        <>
            {qualities.map((item) => (
                <Quality item={item} key={item._id}/>
            ))}
        </>
    );
};

export default QualitiesList;