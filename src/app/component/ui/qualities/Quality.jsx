import React from "react";

const  Quality = ({item}) => {
    return (
        <span className={"badge m-1 bg-" + item.color}>
            {item.name}
        </span>
    )
}

export default Quality;