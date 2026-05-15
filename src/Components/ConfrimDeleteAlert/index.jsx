import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { StyleDeleteModal } from "./StyleConfirmDeleteAlert";

export default function DeleteFoodModalAlert({
  open,
  setOpen,
  setIsDeleted,
  onConfirm,
}) {
  const { t } = useTranslation();

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    setIsDeleted(true);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <StyleDeleteModal>
        <div className="modal-top">
          <div className="warning-icon-wrap">
            <WarningAmberOutlinedIcon />
          </div>
          <div className="modal-texts">
            <p className="modal-title">{t("areYouSure")}</p>
            <p className="modal-desc">
              {t("areYouDescription")} {t("areYouDescription2")}
            </p>
          </div>
        </div>

        <div className="modal-actions">
          <Button
            className="btn-cancel"
            variant="outlined"
            onClick={handleClose}
          >
            {t("cancel")}
          </Button>
          <Button
            className="btn-delete"
            variant="contained"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleConfirm}
          >
            {t("delete")}
          </Button>
        </div>
      </StyleDeleteModal>
    </Modal>
  );
}
