import { useEffect } from "react";

export function getInitialSearchTerm() {
  const url = new URL(window.location.href);
  return url.searchParams.get("search") ?? "";
}

export function useSearchParams(debouncedSearchTerm) {
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("search");

    if (debouncedSearchTerm.length >= 2) {
      url.searchParams.set("search", debouncedSearchTerm);
    }

    window.history.replaceState({}, "", url);
  }, [debouncedSearchTerm]);
}
