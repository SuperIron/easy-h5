/**
 * @description 获取用户代理
 */
export const getUserAgent = () => {
    const ua = window.navigator.userAgent;
    return {
        isIos: /(iPhone|iPad|iPod|iOS)/i.test(ua),
        isAndroid: /(Android)/i.test(ua),
        isWechat: /(MicroMessenger)/i.test(ua),
        isMobile: /(mobile)/i.test(ua)
    };
};

/**
 * @description 获取设备信息
 */
export const getSystemInfo = () => {
    const { innerWidth, innerHeight } = window;
    const ua = getUserAgent();
    return {
        ...ua,
        width: innerWidth,
        height: innerHeight
    };
};
