import { useState } from "react";

export function useToggleFavorite(projectId: string) {
  // In a real app, this would call an API and update global state
  const [isFavorited, setIsFavorited] = useState(false);
  function toggle() {
    setIsFavorited(fav => !fav);
    // TODO: Optimistically update global favorites, call API
  }
  return { isFavorited, toggle };
}
