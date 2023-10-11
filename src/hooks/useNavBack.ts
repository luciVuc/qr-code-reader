import { useCallback, useEffect } from "react";

export const useNavBack = () => {
  const handleNavBack = useCallback((event?: KeyboardEvent | PopStateEvent) => {
    if ((event instanceof KeyboardEvent && (event.code === 'Backspace' || event?.key === 'Backspace')) || event instanceof PopStateEvent) {
      // setResult(undefined);
      if (window.location.pathname !== '/') {
        window.history.go(-1);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', handleNavBack);
    return () => {
      document.removeEventListener('keyup', handleNavBack);
    };
  }, [handleNavBack]);
};

export default useNavBack;