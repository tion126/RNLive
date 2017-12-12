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


export const BannerRequestURL = 'http://webapi.busi.inke.cn/service/ticker?tab_key=80953E3E797912C8&lc=0000000000000079&cc=TG0001&cv=IK5.1.00_Iphone&proto=13&idfa=56F4AFB6-E6F3-4C67-88E8-91629EBAC97E&idfv=DA7063B9-6240-4E39-8649-307B57F46415&devi=015f57cc3c8715f762e22cae987d8b80021b75fd&osversion=ios_11.200000&ua=iPhone10_3&imei=&imsi=&uid=539282733&sid=20vqbX7VuUMlWrcfkr3bi0jP4jmsslDtwY7HbQ97hX2ci2C4i0XZw&conn=wifi&mtid=f7e6ab8a4ca9ec4ef9d2167d9ee0776a&mtxid=f0b429f3fc74&logid=267,207,226,232&smid=&s_sg=b63cb1f582c4ff8c8746b28784a4fb7e&s_sc=100&s_st=1513057517'
export const HotLiveRequestURL = 'http://116.211.167.106/api/live/aggregation?uid=133825214&interest=1'
export const GiftInfoRequestURL = 'http://service.inke.com/api/resource/user_gifts?live_id=1513059142312894&bz_type=0&live_uid=21431423&mjid=0&type=2&scale=3&lc=0000000000000079&cc=TG0001&cv=IK5.1.00_Iphone&proto=13&idfa=56F4AFB6-E6F3-4C67-88E8-91629EBAC97E&idfv=DA7063B9-6240-4E39-8649-307B57F46415&devi=015f57cc3c8715f762e22cae987d8b80021b75fd&osversion=ios_11.200000&ua=iPhone10_3&imei=&imsi=&uid=539282733&sid=20vqbX7VuUMlWrcfkr3bi0jP4jmsslDtwY7HbQ97hX2ci2C4i0XZw&conn=wifi&mtid=f7e6ab8a4ca9ec4ef9d2167d9ee0776a&mtxid=f0b429f3fc74&logid=267,207,226,232&smid=&s_sg=16cc2cc91f48fee334c83294a305f4e6&s_sc=100&s_st=1513059623'
export const NearInfoRequestURL = 'http://116.211.167.106/api/live/near_flow_old?&gender=1&gps_info=116.449411%2C39.904484&loc_info=CN%2C%E5%8C%97%E4%BA%AC%E5%B8%82%2C%E5%8C%97%E4%BA%AC%E5%B8%82&is_new_user=1&lc=0000000000000049&cc=TG0001&cv=IK4.0.00_Iphone&proto=7&idfa=2D707AF8-980F-415C-B443-6FED3E9BBE97&idfv=723152C7-9C98-43F8-947F-18331280D72F&devi=135ede19e251cd6512eb6ad4f418fbbde03c9266&osversion=ios_10.100000&ua=iPhone5_2&imei=&imsi=&uid=392716022&sid=20f7ZyQ3C09I3wDcU0i0bM5n3F8osSAui2L04fGf4WTHRgL9J8qi1&conn=wifi&mtid=87edd7144bd658132ae544d7c9a0eba8&mtxid=acbc329027f3&logid=133&interest=0&longitude=116.449411&latitude=39.904484&multiaddr=1&s_sg=dba9d2e16943a8d4568e8bc0f32e6f7d&s_sc=100&s_st=1488507776'