const config = {
    title: "easy-h5",
    baseURL: {
        dev: "https://api.opadsz.com",
        pro: "https://api.opadsz.com"
    },
    bgMusic: {
        autoplay: false,
        // assets/audios目录下
        src: "bg_music.mp3"
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
