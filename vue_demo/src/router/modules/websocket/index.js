export default [
    {
        path: '/websocket/def',
        name: 'websocketDef',
        meta: {
            title: '',
        },
        component: () => import('@/views/websocket/index.vue'),
    },
    {
        path: '/websocket/index',
        name: 'websocketIndex',
        meta: {
            title: '',
        },
        component: () => import('@/views/websocket/test.vue'),
    },
];
