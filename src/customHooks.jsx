import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ScrollToTop() {
  //NOTE: Everytime that one route changes we scroll to 0 0 (start)
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, [pathname]);

  return null;
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
