const main = {
    //唯一状态值
    state: {
        login: false,
        userInfo: {},
        mbx: ['首页'],
        menus: [],
        activeName: 'home',
        pageId: null,
    },
    //用来更改状态
    mutations: {
        setLogin(state, login) {
            state.login = login;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setMbx(state, mbx) {
            state.mbx = mbx;
        },
        setMenus(state, menus) {
            state.menus = menus;
        },
        setActiveName(state, activeName) {
            state.activeName = activeName;
        },

        setPageId(state, pageId) {
            state.pageId = pageId;
        },
        setClear(state) {
            state.login = false;
            state.userInfo = {};
            state.mbx = ['首页'];
            state.menus = [];
            state.activeName = 'home';
            state.pageId = null;
        },
    }
};

export default main;