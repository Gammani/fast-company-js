import React, {useEffect, useState} from "react";
import api from "../../../api";
import {useNavigate} from "react-router-dom";
import UserCard from "../../ui/UserCard";
import QualitiesCard from "../../ui/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard";
import Comments from "../../ui/Comments";

const UserPage = ({userId}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    }, [])


    if (user) {
        return (
            <div className={"container"}>
                <div className={"row gutters-sm"}>
                    <div className={"col-md mb-3"}>
                        <UserCard user={user}/>
                        <QualitiesCard data={user.qualities}/>
                        <MeetingsCard value={user.completedMeetings}/>
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>loading...</h1>
    }
};

export default UserPage;
