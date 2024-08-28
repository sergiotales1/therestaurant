import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useNavigation } from "react-router-dom";

function BasicAlerts() {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">As vezes ficamos lentos...</Alert>
    </Stack>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AlertDialogSlide() {
  const navigation = useNavigation();
  const timeoutRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (navigation.state === "submitting") {
      timeoutRef.current = setTimeout(() => {
        if (navigation.state === "submitting") {
          setOpen(true);
        }
      }, 5500);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [navigation]);

  const handleClose = () => {
    window.location.reload();

    setOpen(false);
  };

  const handleCloseOverlay = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseOverlay}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <BasicAlerts />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Utilizamos um serviço de hospedagem gratuito para manter o nosso
            servidor online e em períodos de inatividade ele fecha suas portas,
            mas não se preocupe! Basta reiniciar a página e aguardar um pouco
            que todas as funcionalidades do site irão retornar com força total!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            size="medium"
            variant="outlined"
            onClick={handleClose}
          >
            Reiniciar
          </Button>
          <Button
            color="success"
            size="medium"
            variant="contained"
            onClick={handleCloseOverlay}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
