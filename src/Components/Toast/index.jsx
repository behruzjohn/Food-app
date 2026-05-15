import { Snackbar, Alert } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { StyledAlert } from "./StyleToast";

const iconMap = {
  success: <CheckCircleOutlineIcon />,
  error: <ErrorOutlineIcon />,
  info: <InfoOutlinedIcon />,
};

function ToastCompact({ status = "success", title = "", open, setOpen }) {
  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ top: "20px !important" }}
    >
      <StyledAlert
        onClose={handleClose}
        icon={iconMap[status] ?? iconMap.info}
        className={`toast-${status}`}
        severity={status === "info" ? "info" : status}
      >
        {title}
      </StyledAlert>
    </Snackbar>
  );
}

export default ToastCompact;
