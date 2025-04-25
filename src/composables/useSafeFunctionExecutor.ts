import { shallowRef } from "vue";

// 显式指定 appContext 的类型为 any，解决隐式 any 类型的问题
export function useSafeFunctionExecutor() {
  const appContext = getCurrentInstance();
  const context = shallowRef({
    // 允许访问的最小化上下文
    emit: appContext?.emit,
    props: appContext?.props,
    utils: {
      log: console.log,
      formatDate: (date: string | number) => new Date(date).toLocaleString()
    }
    // 其他安全的方法...
  });

  const functionCache = new Map();

  const execute = (code: string, ...args: any[]) => {
    try {
      // 创建安全函数
      const fn = new Function(
        "ctx",
        ...args.map((_, i) => `arg${i}`),
        `
        "use strict";
        const restricted = new Proxy({}, {
          get() {
            throw new Error('访问受限');
          }
        });

        try {
          return (${code})(ctx, ${args.map((_, i) => `arg${i}`).join(", ")});
        } catch(e) {
          console.error('自定义函数错误:', e);
          throw e;
        }
      `
      );

      // 执行函数
      return fn(context.value, ...args);
    } catch (e) {
      console.error("函数执行失败:", e);
      throw e;
    }
  };

  return {
    execute,
    register: (name: string, code: string) => {
      const fn = (...args: any[]) => execute(code, ...args);
      functionCache.set(name, fn);
      return fn;
    },
    get: (name: string) => functionCache.get(name),
    // 为 newProps 参数显式指定类型为 any，解决隐式 any 类型的问题
    updateContext: (newProps: any) => {
      context.value = { ...context.value, ...newProps };
    }
  };
}
