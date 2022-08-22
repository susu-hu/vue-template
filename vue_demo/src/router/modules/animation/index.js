const layIndex = (r) =>
    require.ensure(
        [],
        () => r(require("@/views/layout/layIndex.vue")),
        "layIndex"
    );
const lineG = (r) =>
    require.ensure([], () => r(require("@/views/layout/lineG.vue")), "lineG");
const loading = (r) =>
    require.ensure([], () => r(require("@/views/layout/loading.vue")), "loading");
export default [
    {
        path: "/exportFile",
        name: "exportFile",
        component: () => import('@/views/layout/export.vue'),
    },
    {
        path: "/layIndex",
        name: "layIndex",
        component: layIndex,
    },
    {
        path: "/loading",
        name: "loading",
        component: loading,
    },
    {
        path: "/layout/lineG",
        name: "lineG",
        component: lineG,
    },
    {
        path: "/layout/numRain",
        name: "numRain",
        component: () => import('@/views/layout/numRain.vue'),
    },
];
