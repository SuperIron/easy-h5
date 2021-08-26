import config from "@/config";
import { getUserAgent } from "@/utils/tools";
import { baseURL } from "@/utils/request";
import WxOauth from "./Oauth.class";

const { appId, oauth } = config.wx;
const { isOpened, oauthURL, redirectURI } = oauth;
const { isWechat } = getUserAgent();

// 微信授权
if (isOpened && isWechat) {
    new WxOauth({
        appId,
        oauthURL: baseURL + oauthURL,
        redirectURI,
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
