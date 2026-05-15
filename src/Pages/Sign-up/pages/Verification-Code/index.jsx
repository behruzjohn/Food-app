import { Button } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useEffect, useState } from "react";
import { StyleVerificationCode } from "./StyleVerificationCode";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { CONFIRM_SIGN_UP } from "../../api";
import { useTranslation } from "react-i18next";
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const TOTAL_TIME = 60;

function VerificationCode() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, token } = location.state || {};

  const [code, setCode] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [timer, setTimer] = useState(TOTAL_TIME);

  const [fetchConfirm] = useMutation(CONFIRM_SIGN_UP);

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timer === 0) {
      navigate("/sign-up");
      return;
    }
    const timeout = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(timeout);
  }, [timer, navigate]);

  const handleConfirm = async () => {
    try {
      setConfirmError("");
      const res = await fetchConfirm({ variables: { code, token } });
      if (res?.data?.confirmSignUp?.token) {
        localStorage.setItem("token", res.data.confirmSignUp.token);
        navigate("/sign-in");
      }
    } catch (err) {
      setConfirmError(err.message);
    }
  };

  const isExpiring = timer <= 15;
  const barWidth = `${(timer / TOTAL_TIME) * 100}%`;

  return (
    <StyleVerificationCode>
      <div className="container">
        {/* Header */}
        <div className="container-nav">
          <div className="form-header">
            <div className="form-icon">
              <PhonelinkLockIcon />
            </div>
            <div className="form-header-text">
              <h1>Tasdiqlash kodi</h1>
              <p>{phone || "Telefon raqamingizga kod yuborildi"}</p>
            </div>
          </div>

          <p className="otp-hint">
            Hozircha SMS kelmaydi — shunchaki <strong>12345</strong> ni kiriting
          </p>

          {/* OTP input */}
          <MuiOtpInput
            length={5}
            value={code}
            onChange={(val) => {
              setCode(val);
              if (confirmError) setConfirmError("");
            }}
            sx={{ marginTop: "24px", gap: "10px" }}
            TextFieldsProps={{
              className: confirmError ? "error" : "",
            }}
          />
        </div>

        {/* Timer */}
        <div className="timer-row">
          <span className="timer-label">Vaqt qoldi</span>
          <span className={`timer-value ${isExpiring ? "expiring" : ""}`}>
            {formatTime(timer)}
          </span>
        </div>
        <div className="timer-bar-track">
          <div
            className={`timer-bar-fill ${isExpiring ? "expiring" : ""}`}
            style={{ width: barWidth }}
          />
        </div>

        {/* Error */}
        {confirmError && (
          <p className="error-msg">
            <ErrorOutlineIcon />
            {confirmError}
          </p>
        )}

        {/* Actions */}
        <div className="resultContainer">
          <Button
            className="submit-btn"
            variant="contained"
            disabled={code.length < 5}
            onClick={handleConfirm}
          >
            {confirmError ? t("tryAgain") : t("verify")}
          </Button>

          <p className="back-link">
            {t("dontWant")} <a href="/sign-up">{t("signIn")}</a>
          </p>
        </div>
      </div>
    </StyleVerificationCode>
  );
}

export default VerificationCode;
