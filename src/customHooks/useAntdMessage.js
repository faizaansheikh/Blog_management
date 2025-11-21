// hooks/useAntdMessage.jsx
import { message } from "antd";
import { useCallback } from "react";

export function useAntdMessage() {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = useCallback((type, content) => {
    messageApi.open({ type, content });
  }, [messageApi]);

  const success = useCallback((content) => showMessage("success", content), [showMessage]);
  const error = useCallback((content) => showMessage("error", content), [showMessage]);
  const warning = useCallback((content) => showMessage("warning", content), [showMessage]);

  return { contextHolder, success, error, warning };
}
