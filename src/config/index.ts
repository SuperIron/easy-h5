const config = {
    title: "easy-h5",
    baseURL: {
        dev: "https://api.opadsz.com/",
        pro: "https://api.opadsz.com/"
    },
    bgMusic: {
        autoplay: true,
        src: "/src/assets/audios/bg_music.mp3"
    },
    // 预加载资源
    preload: {
        path: {
            input: "/src/assets/images",
            output: "/src/mixins/preload"
        }
    },
    wx: {
        appId: "wx729b39e5c4715918",
        // 微信登录
        oauth: {
            isOpened: false,
            oauthURL: "api/oauth"
        },
        // 微信分享
        share: { url: "api/zj3j_intro" }
    }
};

export default config;
