import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import Cookies from "js-cookie";
import "react-datepicker/dist/react-datepicker.css";

export default function ScrollToTop() {
  //NOTE: Everytime that one route changes we scroll to 0 0 (start)
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
export function CheckIsLogged() {
  // Used into navbar!
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const token = Cookies.get("jwt");
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [pathname]);

  return { isLoggedIn };
}

export const ReactDatePicker = ({ startDate, onDateChange }) => {
  return (
    <DatePicker
      name="date"
      className="input-date"
      selected={startDate}
      showTimeSelect
      onChange={onDateChange}
      dateFormat="dd/MM/yyyy h:mm aa"
    />
  );
};
