const config = {
    title: "easy-h5",
    baseURL: {
        dev: "https://api.opadsz.com",
        pro: "https://api.opadsz.com"
    },
    bgMusic: {
        autoplay: false,
        src: "assets/audios/bg_music.mp3"
    },
    // 预加载资源
    preload: {
        path: {
            input: "/src/assets/images",
            output: "/src/mixins/preload"
        }
    },
    wx: {
        appId: "wx26640b92468a6bea",
        // 微信登录
        oauth: {
            isOpened: false,
            redirectURI: "https://h5.opadsz.com/dt_h5/#/",
            oauthURL: "/api/party_exam/auth"
        },
        // 微信分享
        share: {
            isOpened: false,
            url: "/api/zj3j_intro"
        }
    }
};

export default config;
