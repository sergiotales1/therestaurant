import Navbar from "../components/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";
import ScrollToTop from "../customHooks";
import { AlertDialogSlide } from "../components/AlertDialogSlide";
import { CircularProgress } from "@mui/material";

function HomeLayout() {
  const { state } = useNavigation();
  if (state === "loading") {
    document.body.scrollTo(0, 0);
  }

  return (
    <>
      <Navbar />

      {(state === "loading" && (
        <div className="loading">
          <CircularProgress color="success" size={90} />
        </div>
      )) || <Outlet />}
      <Footer />
      <ScrollToTop />
      <AlertDialogSlide />
    </>
  );
}

export default HomeLayout;
