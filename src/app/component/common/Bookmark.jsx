import React from "react";

const Bookmark = ({onToggleBookmark, status}) => {
    return (
        <button onClick={() => onToggleBookmark()}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    )
}

export default Bookmark;
