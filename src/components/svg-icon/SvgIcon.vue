<script lang="tsx">
import type { PropType } from "vue";

type IconType = "element" | "local" | "network";
export default defineComponent({
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String as PropType<IconType>,
      default: "element",
      validator: (value: string) => ["element", "local", "network"].includes(value)
    },
    size: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: "#666"
    }
  },

  setup(props) {
    const styles = computed(() => generateStyle());
    // 优化计算属性，提取样式生成逻辑到独立函数，提高代码可读性和可维护性
    const generateStyle = () => {
      let size = "";
      if (typeof props.size === "number") {
        size = `${props.size}px`;
      } else if (/^\d+$/.test(props.size)) {
        size = `${props.size}px`;
      } else {
        size = props.size;
      }
      return {
        fontSize: size,
        color: props.color || "#666"
      };
    };

    const renderIcon = () => {
      switch (props.type) {
        case "element":
          return (
            <el-icon class="svg-icon" size={props.size} color={props.color}>
              {h(resolveComponent(props.name))}
            </el-icon>
          );
        case "local":
          return (
            <svg class="svg-icon" style={styles.value} aria-hidden={true}>
              <use xlinkHref={`#icon-${props.name}`} />
            </svg>
          );
        case "network":
          return <img class="svg-icon" style={styles.value} src={props.name} alt="icon" />;
        default:
          return null;
      }
    };

    return () => <span class="flex-inline">{renderIcon()}</span>;
  }
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
