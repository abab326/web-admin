import type { Directive, DirectiveBinding } from "vue";

interface WatermarkOptions {
  text?: string;
  color?: string;
  fontSize?: string;
  opacity?: number;
  rotate?: number;
}

const defaultOptions: WatermarkOptions = {
  text: "Watermark",
  color: "rgba(0, 0, 0, 0.1)",
  fontSize: "16px",
  opacity: 0.1,
  rotate: -20
};

/**
 * 在指定元素上创建水印
 *
 * @param el HTMLElement, 需要添加水印的元素
 * @param options WatermarkOptions, 水印的配置选项，包括字体大小、颜色、透明度、旋转角度和文本内容
 * @returns 返回包含水印div和观察者的对象
 *
 * 此函数通过在指定元素的父容器中添加一个带有水印的div来实现水印效果
 * 它首先创建一个canvas元素，用于绘制水印文本，然后将canvas内容转换为图片URL，
 * 并将其作为背景图片设置在创建的水印div上此外，它还使用MutationObserver来监控父元素的变化，
 * 以防止水印被删除
 */
function createWatermark(el: HTMLElement, options: WatermarkOptions) {
  // 创建canvas元素并获取其2D渲染上下文
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // 设置canvas的宽度和高度
  canvas.width = 200;
  canvas.height = 100;

  // 绘制水印文本
  ctx.font = `${options.fontSize} Arial`;
  ctx.fillStyle = options.color!;
  ctx.globalAlpha = options.opacity!;
  ctx.rotate((Math.PI / 180) * options.rotate!);
  ctx.fillText(options.text!, 10, 50);

  // 将canvas内容转换为图片URL
  const watermarkUrl = canvas.toDataURL("image/png");

  // 创建水印div
  const watermarkDiv = document.createElement("div");
  watermarkDiv.style.position = "absolute";
  watermarkDiv.style.top = "0";
  watermarkDiv.style.left = "0";
  watermarkDiv.style.width = "100%";
  watermarkDiv.style.height = "100%";
  watermarkDiv.style.pointerEvents = "none";
  watermarkDiv.style.backgroundImage = `url(${watermarkUrl})`;
  watermarkDiv.style.backgroundRepeat = "repeat";

  // 获取父元素并设置相对定位
  let parentEl = el.parentElement;
  if (!parentEl) {
    parentEl = document.body;
  }
  parentEl.style.position = "relative";
  parentEl.appendChild(watermarkDiv);

  // 防止水印被删除
  const observer = new MutationObserver(() => {
    if (!parentEl.contains(watermarkDiv)) {
      parentEl.appendChild(watermarkDiv);
    }
  });

  // 监控父元素的变化
  observer.observe(parentEl, { attributes: true, childList: true, subtree: true });

  // 返回水印div和观察者
  return { watermarkDiv, observer };
}

const watermarkDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<WatermarkOptions>) {
    const options = { ...defaultOptions, ...binding.value };
    createWatermark(el, options);
  }
};

export default watermarkDirective;
