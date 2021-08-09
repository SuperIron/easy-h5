import config from "@/config";
import { AxiosRequestConfig } from "axios";
import wx from "weixin-js-sdk";
import service from "../request";

const { url, isOpened } = config.wx.share;
if (isOpened) {
    const data = {
        url: window.location.href
    };
    const options: AxiosRequestConfig = {
        method: "POST",
        data,
        url
    };
    service.request(options).then(res => {
        const { data } = res;
        const { jssdk, title, desc, link, imgUrl } = data || res;
        const shareOptions = { title, desc, link, imgUrl };
        wx.config(jssdk);
        wx.ready(() => {
            // 分享给朋友 分享给QQ(1.4.0)
            wx.updateAppMessageShareData(shareOptions);
            // 分享到朋友圈 分享到QQ空间(1.4.0)
            wx.updateTimelineShareData(shareOptions);
            // 分享到朋友圈
            wx.onMenuShareTimeline(shareOptions);
            // 分享给朋友
            wx.onMenuShareAppMessage(shareOptions);
            // 分享到QQ
            wx.onMenuShareQQ(shareOptions);
            // 分享到腾讯微博
            wx.onMenuShareWeibo(shareOptions);
            // 分享到QQ空间
            wx.onMenuShareQZone(shareOptions);
        });
    });
}
