import { useEffect } from "react";

export function getInitialSearchTerm() {
  const url = new URL(window.location.href);
  return url.searchParams.get("search") ?? "";
}

export function getInitialType() {
  const url = new URL(window.location.href);
  return url.searchParams.get("type") ?? "movie";
}

export function useSearchParams(debouncedSearchTerm, type = "movie") {
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("search");

    if (debouncedSearchTerm.length >= 2) {
      url.searchParams.set("search", debouncedSearchTerm);
    }

    if (type) {
      url.searchParams.set("type", type);
    }

    window.history.replaceState({}, "", url);
  }, [debouncedSearchTerm, type]);
}
