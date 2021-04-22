const merge = require("webpack-merge");
const tsImportPlugin = require("ts-import-plugin");
const publicPath = process.env.NODE_ENV === "production" ? "./" : "/";
const path = require("path");

module.exports = {
    publicPath,
    lintOnSave: true,
    chainWebpack: config => {
        config.module
            .rule("ts")
            .use("ts-loader")
            .tap(options => {
                options = merge(options, {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPlugin({
                                libraryName: "vant",
                                libraryDirectory: "es",
                                style: true
                            })
                        ]
                    }),
                    compilerOptions: {
                        module: "es2015"
                    }
                });
                return options;
            });
    },
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "scss",
            patterns: [
                // 全局引入Sass Mixins
                path.resolve(__dirname, "./src/styles/mixins.scss")
            ]
        }
    }
};
