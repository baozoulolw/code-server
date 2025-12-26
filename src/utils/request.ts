import { config as browserConfig } from 'src/browser-socket/browser-socket.service';

/** 基础请求方法 */
const request = async (url: string, config: RequestInit) => {
  // 从浏览器配置获取服务端连接参数
  const { host, base, token, origin, port } = browserConfig;

  // 构造完整请求地址并添加认证头
  const response = await fetch(`${origin}://${host}:${port}${base}${url}`, {
    ...config,
    headers: {
      Authorization_lowcode: token, // 低代码平台认证头
      'Content-Type': 'application/json', // 强制JSON格式
      Cookie: `Authorization_lowcode=${token}`, // 同步设置cookie
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return {
      code: '999',
    };
  }
};

/** POST请求封装
 * @param url 接口路径（自动拼接基础路径）
 * @param body 请求体对象（会自动JSON序列化）
 * @param config 额外请求配置
 */
export const post = (url: string, body: object, config?: RequestInit) => {
  return request(url, {
    method: 'post',
    body: JSON.stringify(body),
    ...config,
  });
};

/** 获取页面设计数据
 * @param appCode 应用唯一标识
 * @param pageCode 页面唯一标识
 * @returns 包含页面设计数据的Promise
 */
export const getPage = async (appCode: string, pageCode: string) => {
  const { data } = await post('/admin/page/design/fetch', {
    appPageId: `${appCode}-${pageCode}`,
  });
  return data;
};
