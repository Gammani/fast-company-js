import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({onSort, selectedSort, columns, data, children}) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader {...{onSort, selectedSort}} columns={columns}/>
                    <TableBody {...{columns, data}}/>
                </>
            )}
        </table>
    );
};

export default Table;
