import config from "@/config";
import { AxiosRequestConfig } from "axios";
import wx from "weixin-js-sdk";
import service from "../request";

const url = config.wx.share.url;
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
    wx.config(jssdk);
    wx.ready(function() {
        // 分享给朋友 分享给QQ(1.4.0)
        wx.updateAppMessageShareData({
            title,
            desc,
            link,
            imgUrl,
            success: function() {}
        });
        // 分享到朋友圈  分享到QQ空间(1.4.0)
        wx.updateTimelineShareData({
            title,
            link,
            imgUrl,
            success: function() {}
        });
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title,
            link,
            imgUrl,
            success: function() {},
            cancel: function() {}
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title,
            desc,
            link,
            imgUrl,
            success: function() {},
            cancel: function() {}
        });
        //分享到QQ
        wx.onMenuShareQQ({
            title,
            desc,
            link,
            imgUrl,
            success: function() {},
            cancel: function() {}
        });
        //分享到腾讯微博
        wx.onMenuShareWeibo({
            title,
            desc,
            link,
            imgUrl,
            success: function() {},
            cancel: function() {}
        });
        //分享到QQ空间
        wx.onMenuShareQZone({
            title,
            desc,
            link,
            imgUrl,
            success: function() {},
            cancel: function() {}
        });
    });
});
