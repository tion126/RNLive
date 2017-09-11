'use strict';
import React from 'react-native';
const {
  Alert,
} = React;



export function request(url, method, body, headers) {
  console.log('url = ', url);
  var isOk;
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error('request timeout')), 30000);
    fetch(url, {
        method: method,
        headers: headers,
        body: body,
      })
      .then((response) => {
        if (response.ok) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
      .then((responseData) => {
        clearTimeout(timeoutId);
        if (isOk) {
          console.log('responseData = ', responseData);
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  })
}

export function showAlert(error) {
  let errorContent = '网络请求失败，请稍后再试！'
  let errorTitle = '当前网络异常！'
  if(error == 'Error: request timeout')
    errorContent = '网络请求超时或未接入公司网络，请检查网络后再试！'
  Alert.alert(errorTitle, errorContent, [{text: '好'},]);
}


export const BannerRequestURL = 'http://116.211.167.106/api/live/ticker?lc=0000000000000049&cc=TG0001&cv=IK3.8.10_Iphone&proto=7&idfa=2D707AF8-980F-415C-B443-6FED3E9BBE97&idfv=723152C7-9C98-43F8-947F-18331280D72F&devi=135ede19e251cd6512eb6ad4f418fbbde03c9266&osversion=ios_10.100000&ua=iPhone5_2&imei=&imsi=&uid=392716022&sid=20f7ZyQ3C09I3wDcU0i0bM5n3F8osSAui2L04fGf4WTHRgL9J8qi1&conn=wifi&mtid=87edd7144bd658132ae544d7c9a0eba8&mtxid=acbc329027f3&logid=133&s_sg=de3941864a42502fbbcb20b935a85427&s_sc=100&s_st=1488509570'
export const HotLiveRequestURL = 'http://116.211.167.106/api/live/aggregation?uid=133825214&interest=1'
export const GiftInfoRequestURL = 'http://116.211.167.106/api/resource/gift_info?lc=0000000000000049&cc=TG0001&cv=IK3.8.10_Iphone&proto=7&idfa=2D707AF8-980F-415C-B443-6FED3E9BBE97&idfv=723152C7-9C98-43F8-947F-18331280D72F&devi=135ede19e251cd6512eb6ad4f418fbbde03c9266&osversion=ios_10.100000&ua=iPhone5_2&imei=&imsi=&uid=392716022&sid=20f7ZyQ3C09I3wDcU0i0bM5n3F8osSAui2L04fGf4WTHRgL9J8qi1&conn=wifi&mtid=87edd7144bd658132ae544d7c9a0eba8&mtxid=acbc329027f3&logid=133&type=2&scale=2&s_sg=87508b487226af753ce19ca3a6f9e975&s_sc=100&s_st=1488507776'
export const NearInfoRequestURL = 'http://116.211.167.106/api/live/near_flow_old?&gender=1&gps_info=116.449411%2C39.904484&loc_info=CN%2C%E5%8C%97%E4%BA%AC%E5%B8%82%2C%E5%8C%97%E4%BA%AC%E5%B8%82&is_new_user=1&lc=0000000000000049&cc=TG0001&cv=IK4.0.00_Iphone&proto=7&idfa=2D707AF8-980F-415C-B443-6FED3E9BBE97&idfv=723152C7-9C98-43F8-947F-18331280D72F&devi=135ede19e251cd6512eb6ad4f418fbbde03c9266&osversion=ios_10.100000&ua=iPhone5_2&imei=&imsi=&uid=392716022&sid=20f7ZyQ3C09I3wDcU0i0bM5n3F8osSAui2L04fGf4WTHRgL9J8qi1&conn=wifi&mtid=87edd7144bd658132ae544d7c9a0eba8&mtxid=acbc329027f3&logid=133&interest=0&longitude=116.449411&latitude=39.904484&multiaddr=1&s_sg=dba9d2e16943a8d4568e8bc0f32e6f7d&s_sc=100&s_st=1488507776'