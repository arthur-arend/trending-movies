import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  enabled?: boolean;
  rootMargin?: string;
  sentinelId?: string;
}

export const useInfiniteScroll = ({
  onLoadMore,
  enabled = true,
  rootMargin = "100px",
  sentinelId = "infinite-scroll",
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onLoadMore();
        }
      },
      {
        rootMargin,
      }
    );

    const sentinel = document.querySelector(`#${sentinelId}`);
    if (sentinel && observerRef.current) {
      observerRef.current.observe(sentinel);
    }

    return () => {
      if (observerRef.current) {
        const sentinel = document.querySelector(`#${sentinelId}`);
        if (sentinel) {
          observerRef.current.unobserve(sentinel);
        }
        observerRef.current.disconnect();
      }
    };
  }, [enabled, onLoadMore, rootMargin, sentinelId]);
};
