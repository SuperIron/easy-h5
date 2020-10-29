const config = {
    baseUrl: {
        dev: "https://api.opadsz.com/",
        pro: "https://api.opadsz.com/"
    },
    bgMusic: {
        autoplay: true,
        /**
         * 背景音乐路径，放于`@/assests/`目录下
         */
        src: "audios/bg_music.mp3"
    },
    preload: {
        path: {
            /**
             * 预加载资源入口
             */
            input: "/src/assets/images",
            /**
             * 预加载配置出口
             */
            output: "/src/mixins/preload"
        }
    }
};

export default config;
