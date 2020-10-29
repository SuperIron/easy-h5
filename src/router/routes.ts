import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "index",
        component: () => import("@/views/index/index.vue")
    }
];

export default routes;
