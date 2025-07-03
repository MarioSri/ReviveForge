import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "rf-coach-dismissed";

export function useCoachMarks() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    setDismissed(raw ? JSON.parse(raw) : []);
  }, []);

  const showMark = useCallback((id: string) => {
    if (!dismissed.includes(id)) setCurrent(id);
  }, [dismissed]);

  const dismissCurrent = useCallback(() => {
    if (current) {
      const updated = [...dismissed, current];
      setDismissed(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setCurrent(null);
    }
  }, [current, dismissed]);

  const isDismissed = useCallback((id: string) => dismissed.includes(id), [dismissed]);

  return { showMark, dismissCurrent, isDismissed, current };
}
