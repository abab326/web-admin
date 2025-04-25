import { ref } from "vue";

type StatusType = "info" | "warning" | "error" | "success";

interface StatusMessage {
  text: string;
  type: StatusType;
  timestamp: number;
}

export function useBpmnState() {
  const statusMessages = ref<StatusMessage[]>([]);

  const setStatus = (text: string, type: StatusType = "info") => {
    statusMessages.value.push({
      text,
      type,
      timestamp: Date.now()
    });

    // 限制消息数量
    if (statusMessages.value.length > 20) {
      statusMessages.value.shift();
    }
  };

  const clearStatus = () => {
    statusMessages.value = [];
  };

  return {
    statusMessages,
    setStatus,
    clearStatus
  };
}
