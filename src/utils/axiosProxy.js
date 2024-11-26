import request from '@/utils/http'


const promiseRecord = {}; // 用于缓存请求状态

/**
 * 通过路径和参数生成唯一字符
 * @param {*} apiUrl
 */
const createKey = (apiUrl) => {
  return apiUrl;
};

// 普通的 get 请求
const get = (apiUrl,params) => request.get(apiUrl,params)

/**
 * 用来发起需要缓存的请求
 * @param {String} apiUrl
 */
const getCache = (apiUrl, params) => {
  // 用请求路径和参数生成标识，完全相同的请求的标识一样，作为储存的键
  let keyName = createKey(apiUrl);

  return new Promise((resolve, reject) => {
    let data = sessionStorage.getItem(keyName);

    let request = () => {
      get(apiUrl,params)
        .then((value) => {
          value.requestTime = new Date();
          sessionStorage.setItem(keyName, JSON.stringify(value));
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
    };

    // 数据存在且不需要刷新，直接获取响应
    let nowDate = new Date();
    if (data && parseInt(nowDate-data.requestTime)>60000) {
      // 如果用户手动修改了 sessionStorage 里的数据可能会出错，应该做下处理
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        request();
      }
    } else {
      request();
    }
  });
};

/**
 * 防止重复处理
 */
const repeat = (apiUrl, parmas, request) => {
  // 用请求路径和参数生成标识，完全相同的请求的标识一样，可以使用同一个请求结果
  let keyName = createKey(apiUrl);

  if (!promiseRecord[keyName]) {
    promiseRecord[keyName] = new Promise((resolve, reject) => {
      request(apiUrl, parmas)
        .then((value) => {
          promiseRecord[keyName] = null;
          resolve(value);
        })
        .catch((error) => {
          promiseRecord[keyName] = null;
          reject(error);
        });
    });
  }

  return promiseRecord[keyName];
};

/**
 * 返回请求的函数
 * @param {String} apiUrl
 * @param {Object} options 配置项
 */
const getAxios = (apiUrl, parmas, options = {}) => {
  // 默认配置
  let defaults = {
    repeat: true // 是否开启防止同时发起相同的请求
  };
  let _options = Object.assign(Object.assign({}, defaults), options);

  // 返回原始的axiso get请求
  if (! _options.repeat) {
    return get(apiUrl,parmas);
  }else{
    return repeat(apiUrl, parmas, getCache);
  }
};

export default getAxios;