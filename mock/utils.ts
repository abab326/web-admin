// 生成结果
export const generateResult = (result: any, code = 200, message = "") => {
  return {
    code,
    data: result,
    message
  };
};
