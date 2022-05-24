import React from "react";
import {useParams} from "react-router-dom";
import UserPage from "../component/page/userPage/index";
import UsersListPage from "../component/page/usersListPage/index";
import EditUserPage from "../component/page/editUserPage/index";
import UserProvider from "../hooks/useUsers";

const Users = () => {

    const params = useParams();
    const {userId, edit} = params;

    return (
        <>
            <UserProvider>
                {userId ? (edit ? (<EditUserPage/>) : (<UserPage userId={userId}/>)) : (<UsersListPage/>)}
            </UserProvider>
        </>
    );
};

export default Users;
