
const columns = (obj) => {

    const table = [
        {
            type: "selection",
            width: 60,
            align: "center",
            fixed: "left",
        },
        {
            title: "序号",
            slot: "index",
            width: 80,
            align: "center",
        },
        {
            title: "ID",
            key: "id",
            align: "center",
        },
        {
            title: "名称",
            key: "name",
            align: "center",
            ellipsis: true,
        },
        {
            title: "年龄",
            key: "age",
            align: "center",
        },
        {
            title: "创建时间",
            key: "dateTime",
            align: "center",
        },
        {
            title: "头像",
            slot: "iconCover",
            align: "center",
        },
        {
            title: "查看",
            render: (h, params) => {
                const { row } = params;
                return h(
                    "a",
                    {
                        style: {
                            marginRight: "5px",
                        },
                        on: {
                            click: () => {
                                obj.handleOpenDeatil(row.name, obj.susu);
                            },
                        },
                    },
                    "查看详情"
                );
            },
        },
        {
            title: "操作",
            slot: "action",
            align: "center",
        },
    ];
    return table
}
export default columns;
