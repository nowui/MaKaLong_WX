const constant = require("./constant.js");
const storage = require("./storage.js");
const CryptoJS = require('./crypto-js/crypto-js');

function isPhone(phone) {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        return false;
    }
    return true;
}

function showSuccessToast(config) {
    wx.showToast({
        title: config.title,
        icon: 'success',
        mask: true,
        duration: constant.duration,
        success: config.success
    });
}

function showFailToast(config) {
    wx.showToast({
        title: config.title,
        image: '/image/info.png',
        mask: true,
        duration: constant.duration,
        success: config.success
    });
}

function encrypt(text) {
    try {
        var key = CryptoJS.enc.Utf8.parse(constant.aes_key);

        var srcs = CryptoJS.enc.Utf8.parse(text);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    } catch (e) {
        this.showFailToast({
            title: '没有权限',
            success: function () {

            }
        });
        return;
    }
}

function decrypt(text) {
    try {
        var key = CryptoJS.enc.Utf8.parse(constant.aes_key);

        var decrypt = CryptoJS.AES.decrypt(text, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    } catch (e) {
        this.showFailToast({
            title: '没有权限',
            success: function () {

            }
        });
        return '';
    }
}

module.exports = {
    isPhone: isPhone,
    showSuccessToast: showSuccessToast,
    showFailToast: showFailToast,
    encrypt: encrypt,
    decrypt: decrypt
};