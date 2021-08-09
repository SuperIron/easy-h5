import Cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";

type WxOauthScope = "snsapi_base" | "snsapi_userinfo";

type WxOauthOnSuccess = (
    data: any
) => {
    openId: string;
    unionId: string;
    userInfo: any;
};

type WxOauthOnFail = (err: any) => void;

interface WxOauthOptions {
    /** 公众号的唯一标识 */
    appId: string;
    /** 应用授权作用域，默认snsapi_base */
    scope?: WxOauthScope;
    /** Cookies过期时间/天，默认30天 */
    expires?: number;
    /** 重定向地址 */
    redirectURI: string;
    /** 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节 */
    state?: string;
    /** 服务器授权地址，获取openId unionId */
    oauthURL: string;
    /** 服务器授权成功回调，需要返回openId unionId userInfo 等数据做逻辑处理 */
    onSuccess: WxOauthOnSuccess;
    /** 服务器授权失败回调 */
    onFail?: WxOauthOnFail;
}

class WxOauth {
    private appId: string;
    private scope: WxOauthScope;
    private isSnsapiBase: boolean;
    private expires: number;
    private state: string;
    private oauthURL: string;
    private redirectURI: string;
    private onSuccess: WxOauthOnSuccess;
    private onFail: WxOauthOnFail;

    constructor(options: WxOauthOptions) {
        const {
            appId,
            scope,
            expires,
            state,
            oauthURL,
            redirectURI,
            onSuccess,
            onFail
        } = options;

        this.appId = appId;
        this.scope = scope || "snsapi_base";
        this.isSnsapiBase = scope === "snsapi_base";
        this.expires = expires || 30;
        this.state = state || "";
        this.oauthURL = oauthURL;
        this.redirectURI = redirectURI;

        this.onSuccess = onSuccess;
        this.onFail = onFail || function() {};

        this._init();
    }

    /**
     * 判断数据是否为对象
     */
    private _isObject(data: any) {
        return Object.prototype.toString.call(data) === "[object Object]";
    }

    /**
     * 获取请求参数，支持解析带#的url
     */
    private _getQueryString(name: string) {
        return (
            decodeURIComponent(
                (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
                    location.href
                ) || ["", ""])[1].replace(/\+/g, "%20")
            ) || null
        );
    }

    /**
     * @description 获取拼接后的url，过滤undefined|null数据
     */
    private _getURL(url: string, data: any) {
        if (!this._isObject(data)) {
            return url;
        }
        const params = Object.keys(data).reduce((pre, key) => {
            const value = data[key];
            value !== undefined &&
                value !== null &&
                (pre += `&${key}=${value}`);
            return pre;
        }, "");
        return `${url}${params.replace("&", "?")}`;
    }

    /**
     * 服务器授权，获取用户信息
     */
    private _oauth(code: string, state: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const options: AxiosRequestConfig = {
                method: "POST",
                data: {
                    code,
                    state
                },
                url: this.oauthURL
            };
            try {
                const { data } = await axios.request(options);
                const { openId, unionId, userInfo } = this.onSuccess(data);
                Cookies.set(this._getCookieName("unionId"), unionId, {
                    expires: this.expires
                });
                Cookies.set(this._getCookieName("openId"), openId, {
                    expires: this.expires
                });
                Cookies.set(this._getCookieName("userInfo"), userInfo, {
                    expires: this.expires
                });
                resolve();
            } catch (err) {
                this.onFail(err);
                reject();
            }
        });
    }

    /**
     * 生成特定cookie名
     */
    private _getCookieName(name: string) {
        return `wx_oauth_${this.appId}_${name}`;
    }

    /**
     * 是否已登录
     */
    private _isLogged(openId: string, unionId: string) {
        return this.isSnsapiBase ? openId : unionId || openId;
    }

    /**
     * @description 登录，通过code获取用户信息
     */
    private async _login() {
        const code = this._getQueryString("code");
        if (!code) {
            this.oauth();
            return;
        }
        const state = this._getQueryString("state") || "";
        await this._oauth(code, state);
    }

    private _init() {
        const unionId = Cookies.get(this._getCookieName("unionId")) || "";
        const openId = Cookies.get(this._getCookieName("openId")) || "";
        !this._isLogged(openId, unionId) && this._login();
    }

    /**
     * 微信授权，支持切换账号
     */
    public oauth() {
        Cookies.remove(this._getCookieName("unionId"));
        Cookies.remove(this._getCookieName("openId"));
        const url = this._getURL(
            "https://open.weixin.qq.com/connect/oauth2/authorize",
            {
                appid: this.appId,
                redirect_uri: encodeURIComponent(this.redirectURI),
                response_type: "code",
                scope: this.scope,
                state: this.state
            }
        );
        location.href = `${url}#wechat_redirect`;
    }

    /**
     * 获取用户信息
     */
    public getUserInfo() {
        const userInfo = Cookies.get(this._getCookieName("userInfo"));
        return userInfo ? JSON.parse(userInfo) : {};
    }

    public getOpenId() {
        return Cookies.get(this._getCookieName("openId"));
    }

    public getUnionId() {
        return Cookies.get(this._getCookieName("unionId"));
    }
}

export default WxOauth;
