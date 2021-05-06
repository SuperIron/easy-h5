import config from "@/config";
import { getUserAgent } from "@/utils/tools";
import WxOauth from "./Oauth.class";

const BASE_URL = "https://labs.opadsz.com/";

// 微信授权
if (config.wx.oauth.isOpened && getUserAgent().isWechat) {
    const { appId, oauth } = config.wx;
    const { oauthURL } = oauth;
    const wxOauth = new WxOauth({
        appId,
        oauthURL: BASE_URL + oauthURL,
        onSuccess: res => {
            const { data } = res;
            const { original = {} } = data;
            const { unionid = "", openid = "" } = original;
            return {
                unionId: unionid,
                openId: openid,
                userInfo: original
            };
        }
    });
}
