import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);

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
    // <DatePicker
    //   name="date"
    //   className="input-date"
    //   selected={startDate}
    //   showTimeSelect
    //   onChange={onDateChange}
    //   dateFormat="dd/MM/yyyy h:mm aa"
    // />
    <DatePicker
      name="date"
      className="input-date"
      selected={startDate}
      locale="pt-BR" // Ensure locale is applied
      showTimeSelect
      onChange={onDateChange}
      timeFormat="HH:mm" // 'p' should work, but you might want to ensure it's using 'HH:mm' style
      dateFormat="dd/MM/yyyy HH:mm" // For 'P' = 'dd/MM/yyyy' and 'p' = 'HH:mm'
    />
  );
};
