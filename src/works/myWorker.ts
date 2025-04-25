// 定义 worker 的类型
type WorkerMessage = {
  type: string;
  data: any;
};

// 监听主线程的消息
self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { type, data } = e.data;
  console.log("Worker received message:", e.data);
  if (type === "CALCULATE") {
    // 执行一些耗时计算
    const result = heavyCalculation(data);
    console.log("Worker received message:", result);
    // 将结果发送回主线程
    self.postMessage({
      type: "RESULT",
      data: result
    });
  }
};

function heavyCalculation(input: any): any {
  // 这里是一个模拟的耗时操作
  let result = 0;
  for (let i = 0; i < input * 1000; i++) {
    console.log("Worker received message:", i);
    result += i;
  }
  return result;
}

// 为了 TypeScript 类型检查，添加以下声明
export default {} as typeof Worker & { new (): Worker };
