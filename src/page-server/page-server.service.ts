import { Injectable } from '@nestjs/common';
import { config, clientMap } from 'src/browser-socket/browser-socket.service';
import { isEmpty } from 'lodash';
import { getPage } from 'src/utils/request';

/**
 * 页面服务控制器
 * 处理页面数据的获取和更新，管理浏览器客户端连接
 */
@Injectable()
export class PageServerService {
  /**
   * 获取指定页面设计数据
   * @param appCode 应用唯一标识符
   * @param pageCode 页面唯一标识符
   * @returns Promise<{code: string, data?: any, msg?: string}> 返回结果对象
   */
  async getPage(appCode: string, pageCode: string) {
    // 检查浏览器连接配置是否就绪
    if (!isEmpty(config)) {
      const data = await getPage(appCode, pageCode);
      return {
        code: '0',
        data,
      };
    }
    return {
      code: '99',
      msg: '没有浏览器接入',
    };
  }

  /**
   * 向指定页面推送更新数据
   * @param data 页面更新信息对象
   * <mcsymbol name="SetPageInfo" filename="page-server.service.ts" path="/Volumes/WORK2/monkey/utils/code-server/src/page-server/page-server.service.ts" startline="19" type="class"></mcsymbol>
   * @returns {code: string, msg: string} 操作结果
   */
  setPage(data: SetPageInfo) {
    // 从请求数据中解构应用和页面标识
    const {
      data: { appCode, pageCode },
    } = data;
    const key = `${appCode}-${pageCode}`;

    // 检查目标页面是否存在活跃连接
    if (clientMap.has(key)) {
      const socket = clientMap.get(`${appCode}-${pageCode}`);
      socket.send(JSON.stringify(data));
      return {
        code: '0',
        msg: '发送消息成功',
      };
    } else {
      return {
        code: '99',
        msg: '没有对应页面接入',
      };
    }
  }
}
