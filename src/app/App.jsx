import React from "react";
import Users from "./layouts/Users";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import NavBar from "./component/ui/NavBar";
import {ToastContainer} from "react-toastify";
import {ProfessionProvider} from "./hooks/useProfession";
import {QualitiesProvider} from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";

const App = () => {

    return (
        <div>
            <AuthProvider>
                <NavBar/>
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Routes>

                            <Route path={"/users"}>
                                <Route path={":userId"} element={<Users/>}>
                                    <Route path={":edit"} element={<Users/>}/>
                                    <Route path={""} element={<Users/>}/>
                                    <Route/>
                                </Route>
                                <Route path={""} element={<Users/>}/>

                            </Route>
                            <Route path={"/login"}>
                                <Route path={":type"} element={<Login/>}/>
                                <Route path={""} element={<Login/>}/>
                            </Route>

                            <Route path={"/"} element={<Main/>}/>
                            <Route
                                path={"*"}
                                element={<Navigate to="/" replace/>}
                            />
                        </Routes>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer/>
        </div>
    );
};

export default App;
