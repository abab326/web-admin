import { type ProxyOptions } from "vite";

export default function createProxy(proxyList: [string, string][] = []) {
  const ret: Record<string, string | ProxyOptions> = {};
  for (const [prefix, target] of proxyList) {
    const isHttps = /^https:\/\//.test(target);
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ""),
      ...(isHttps ? { secure: false } : {})
    };
  }
  return ret;
}
