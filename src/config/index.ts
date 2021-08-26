const config = {
    /**
     * 标题
     */
    title: "easy-h5",
    /**
     * 基础url
     */
    baseURL: {
        dev: "",
        pro: ""
    },
    /**
     * 背景音乐
     */
    bgMusic: {
        autoplay: false,
        // assets/audios目录下
        src: "bg_music.mp3"
    },
    /**
     * 微信公众号
     */
    wx: {
        appId: "",
        // 登录
        oauth: {
            isOpened: false,
            // 登录重定向地址
            redirectURI: "",
            // 服务器授权地址
            oauthURL: ""
        },
        // 分享
        share: {
            isOpened: false,
            // 服务器分享地址
            url: ""
        }
    }
};

export default config;
