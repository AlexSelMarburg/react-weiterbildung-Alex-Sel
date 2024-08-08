import { useEffect, useState } from "react";
import "../css/componenets/WebsiteWrapper.css";
import ScrollTopButton from "./ScrollTopButton.jsx";

// eslint-disable-next-line react/prop-types
export default function WebsiteWrapper({ children }) {
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);
  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 300
        ? setShowScrollTopBtn(true)
        : setShowScrollTopBtn(false);
    };
    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  }, []);

  return (
    <div id="website-wrapper">
      {children}
      {showScrollTopBtn && <ScrollTopButton />}
    </div>
  );
}
