import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  //NOTE: Everytime that one route changes we scroll to 0 0 (start)
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
