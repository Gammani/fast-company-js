import React from "react";


const SearchStatus = ({length}) => {

    const renderPhrase = (value) => {
        if (value === 0) {
            return `Никто с тобой не тусанет`
        }
        let decCache = [],
            decCases = [2, 0, 1, 1, 1, 2];

        function decOfNum(value, titles) {
            if (!decCache[value]) decCache[value] = value % 100 > 4 && value % 100 < 20 ? 2 : decCases[Math.min(value % 10, 5)];
            return titles[decCache[value]];
        }

        return decOfNum(value, [`${value} человек тусанет с тобой сегодня`, `${value} человека тусанут с тобой сегодня`, `${value} человек тусанет с тобой сегодня`]);
    };

    return (
        <div>
            <h1>
                <span
                    className={length !== 0 ? "badge bg-primary" : "badge bg-danger"}>{renderPhrase(length)}
                </span>
            </h1>
        </div>
    )
}

export default SearchStatus;
