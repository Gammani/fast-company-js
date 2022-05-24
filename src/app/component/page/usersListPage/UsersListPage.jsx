// import React, {useEffect, useState} from "react";
// import Pagination from "../../common/Pagination";
// import api from "../../../api/index";
// import {paginate} from "../../../utils/paginate";
// import GroupList from "../../common/GroupList";
// import SearchStatus from "../../ui/SearchStatus";
// import UsersTable from "../../ui/UsersTable";
// import _ from "lodash";
//
//
// const UsersListPage = () => {
//
//
//     const pageSize = 4;
//     const [currentPage, setCurrentPage] = useState(1);
//     const [professions, setProfessions] = useState(undefined);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedProf, setSelectedProf] = useState(undefined);
//     const [sortBy, setSortBy] = useState({path: "name", order: "asc"});
//     const [users, setUsers] = useState(undefined);
//
//     useEffect(() => {
//         api.users.fetchAll().then((data) => setUsers(data))
//     }, [])
//
//
//     const handleDelete = (id) => {
//         if (users) {
//             setUsers(users.filter((user) => user._id !== id))
//         }
//     };
//
//     const handleToggleBookMark = (id) => {
//         if (users) {
//             setUsers(
//                 users.map((user) => {
//                     if (id === user._id) {
//                         return {...user, bookmark: !user.bookmark}
//                     }
//                     return user
//                 })
//             )
//         }
//     };
//
//
//     useEffect(() => {
//         api.professions.fetchAll().then((data) => setProfessions(data));
//     }, []);
//
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [selectedProf, searchQuery]);
//
//     const handleProfessionSelect = (item) => {
//         setSearchQuery("");
//         setSelectedProf(item);
//     }
//
//     const handleSearchQuery = ({target}) => {
//         setSelectedProf(undefined);
//         setSearchQuery(target.value);
//     }
//
//
//     const handlePageChange = (pageIndex) => {
//         setCurrentPage(pageIndex);
//     }
//
//     const handleSort = (item) => {
//         setSortBy(item)
//     }
//
//     if (users) {
//         const filteredUsers = searchQuery ?
//             users.filter((user) => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
//             : selectedProf
//                 ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
//                 : users;
//         const count = filteredUsers && filteredUsers.length;
//
//         const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
//         let usersCrop = paginate(sortedUsers, currentPage, pageSize);
//
//         const clearFilter = () => {
//             setSearchQuery("");
//             setSelectedProf(undefined);
//         }
//
//
//         return (
//             <div className={"d-flex"}>
//                 {
//                     professions && (
//                         <div className="d-flex flex-column flex-shrink-0 p-3">
//
//                             <GroupList
//                                 items={professions}
//                                 onItemSelect={handleProfessionSelect}
//                                 selectedItem={selectedProf}
//                             />
//                             <button className={"btn btn-secondary mt-2"} onClick={clearFilter}>Очистить</button>
//                         </div>
//                     )}
//                 <div className="d-flex flex-column">
//                     <SearchStatus length={count}/>
//                     <input
//                         type={"text"}
//                         name={"searchQuery"}
//                         placeholder={"Search..."}
//                         onChange={handleSearchQuery}
//                         value={searchQuery}
//                     />
//                     {
//                         count > 0 && <UsersTable
//                             users={usersCrop}
//                             onDelete={handleDelete}
//                             onToggleBookmark={handleToggleBookMark}
//                             onSort={handleSort}
//                             selectedSort={sortBy}
//                         />
//                     }
//                     <div className="d-flex justify-content-center">
//                         <Pagination
//                             itemsCount={count}
//                             pageSize={pageSize}
//                             currentPage={currentPage}
//                             onPageChange={handlePageChange}
//                         />
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//     return (
//         <>
//             loading...
//         </>
//     );
// };
//
// export default UsersListPage;



import React, {useEffect, useState} from "react";
import {ProfessionsTypeObject, ProfessionType, UsersType} from "../../../api/fake.api/user.api";
import Pagination from "../../common/Pagination";
import api from "../../../api";
import {paginate} from "../../../utils/paginate";
import GroupList from "../../common/GroupList";
import SearchStatus from "../../ui/SearchStatus";
import UsersTable from "../../ui/UsersTable";
import _ from "lodash";
import {useUser} from "../../../hooks/useUsers";




const UsersListPage = () => {


    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(undefined);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProf, setSelectedProf] = useState(undefined);
    const [sortBy, setSortBy] = useState({path: "name", order: "asc"});

    const {users} = useUser();
    console.log(users);


    const handleDelete = (userId) => {
        console.log(userId)
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };


    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleProfessionSelect = (item) => {
        setSearchQuery("");
        setSelectedProf(item);
    }

    const handleSearchQuery = ({target}) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    }


    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    if (users) {
        const filteredUsers = searchQuery ?
            users.filter((user) => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            : selectedProf
                ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
                : users;
        const count = filteredUsers && filteredUsers.length;

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        let usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSearchQuery("");
            setSelectedProf(undefined);
        }


        return (
            <div className={"d-flex"}>
                {
                    professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">

                            <GroupList
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                                selectedItem={selectedProf}
                            />
                            <button className={"btn btn-secondary mt-2"} onClick={clearFilter}>Очистить</button>
                        </div>
                    )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count}/>
                    <input
                        type={"text"}
                        name={"searchQuery"}
                        placeholder={"Search..."}
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                    {
                        count > 0 && <UsersTable
                            users={usersCrop}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookMark}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    }
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            loading...
        </>
    );
};

export default UsersListPage;
