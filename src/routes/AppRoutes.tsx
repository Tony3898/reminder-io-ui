import { createElement } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components";
import { allRoutes } from "../constants/routes";
import PageNotFound from "../pages/PageNotFount";

export default function AppRoute() {
    return (
        <Routes>
        {
            allRoutes.map(route => <Route key={ route.path } index = { route.index } path = { route.path }
                                             element = {
                    route.protectedRoute
                        ? <ProtectedRoute children={ createElement(route.element)
                        } />
                        : createElement(route.element)
                    }
                />)
            }
            <Route path={ '*' } element = {< PageNotFound />}/>
        </Routes>
    );
}