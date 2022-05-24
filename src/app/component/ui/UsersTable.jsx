import React from "react";
import Bookmark from "../common/Bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import {Link} from "react-router-dom";


const UsersTable = ({users, onDelete, onToggleBookmark, onSort, selectedSort}) => {

    const columns = {
        name: {path: "name", name: "Имя", component: (user) => <Link to={`${user._id}`}>{user.name}</Link>},
        qualities: {name: "Качества", component: (user) => (<Qualities qualities={user.qualities}/>)},
        professions: {path: "profession.name", name: "Профессия"},
        completedMeetings: {path: "completedMeetings", name: "Встретился, раз"},
        rate: {path: "rate", name: "Оценка"},
        bookmark: {
            path: "bookmark", name: "Избранное", component: (user) => (<Bookmark
                onToggleBookmark={() => onToggleBookmark(user._id)}
                status={user.bookmark}
            />)
        },
        delete: {
            component: (user) => (<button className={"btn btn-danger"} onClick={() => onDelete(user._id)}>
                delete
            </button>)
        }
    }


    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}/>
    );
};

export default UsersTable;
