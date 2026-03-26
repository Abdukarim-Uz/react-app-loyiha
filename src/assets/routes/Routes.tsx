import { Outlet, type RouteObject } from "react-router-dom";
import { lazy } from "react";

const Products = lazy(() => import("../pages/products/Products"))

const Home = lazy(() => import("../pages/home/Home"))

const Category = lazy(() => import("../pages/category/Category"))

const NotFound = lazy(() => import("../pages/notFound/NotFound"))

const Detail = lazy(() => import("../pages/detail/Detail"))

const CategoryDetail = lazy(() => import("../pages/categoryDetail/categoryDetail"))

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Outlet />,
        children: [
            {
                index: true, element: <Home />
            },
            {
                path: "products", element: <Products />
            },
            {
                path: "category", element: <Category />
            },
            {
                path: "detail/:id", element: <Detail />
            },
            {
                path: "category-detail/:id", element: <CategoryDetail />
            }
        ]
    },
    {
        path: "*", element: <NotFound />
    }
]