import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollToTopProps } from "@/interfaces/interface";

export default function ScrollToTop({ children }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}
