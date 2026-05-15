import { useState } from "react";
import { FORGOT_PASSWORD } from "./api";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { Controller, useForm } from "react-hook-form";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const strengthColors = ["", "#E24B4A", "#BA7517", "#639922", "#3B6D11"];

function getStrength(v) {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (v.length >= 12) s++;
  return s;
}

function ChangePassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { control, handleSubmit, watch } = useForm({
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
  const strength = getStrength(newPassword);

  const rules = [
    { id: "len", met: newPassword.length >= 8, label: t("pwdMin8") },
    { id: "upper", met: /[A-Z]/.test(newPassword), label: t("pwdUppercase") },
    { id: "num", met: /[0-9]/.test(newPassword), label: t("pwdNumber") },
  ];

  const passwordsMatch =
    confirmPassword.length > 0 && confirmPassword === newPassword;
  const allValid = rules.every((r) => r.met) && passwordsMatch;

  const [changePassword, { error }] = useMutation(FORGOT_PASSWORD);

  const onSubmit = async (formData) => {
    try {
      await changePassword({
        variables: {
          data: {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
          },
        },
      });

      setSuccessMessage(t("pwdChanged"));

      setTimeout(() => navigate("/sign-in"), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      fontSize: 14,
      "& fieldset": { borderColor: "#e0ddd8", borderWidth: "0.5px" },
      "&:hover fieldset": { borderColor: "#b0ada6" },
      "&.Mui-focused fieldset": { borderColor: "#1a1916", borderWidth: "1px" },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#faf9f7",
      }}
    >
      <Container maxWidth="xs" disableGutters>
        <Box
          sx={{
            bgcolor: "#fff",
            border: "0.5px solid #e8e4dc",
            borderRadius: "12px",
            p: "40px 36px",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
              pb: 3,
              borderBottom: "0.5px solid #e8e4dc",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "8px",
                bgcolor: "#f4f1eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockIcon sx={{ fontSize: 18, color: "#9e9890" }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1a1916",
                  lineHeight: 1.3,
                }}
              >
                {t("forgotPass")}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#9e9890" }}>
                {t("pwdSecurity")}
              </Typography>
            </Box>
          </Box>

          {/* Success */}
          {successMessage && (
            <Alert
              severity="success"
              sx={{ mb: 2, borderRadius: "8px", fontSize: 13 }}
            >
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2, borderRadius: "8px", fontSize: 13 }}
            >
              {error.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {/* Old password */}
              <Controller
                name="oldPassword"
                control={control}
                rules={{ required: "Eski parolni kiriting" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type={showOld ? "text" : "password"}
                    label={t("oldPassword")}
                    error={Boolean(error)}
                    helperText={error?.message}
                    sx={inputSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ fontSize: 16, color: "#b0ada6" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setShowOld((p) => !p)}
                            edge="end"
                          >
                            {showOld ? (
                              <VisibilityOffIcon sx={{ fontSize: 16 }} />
                            ) : (
                              <VisibilityIcon sx={{ fontSize: 16 }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* New password */}
              <Box>
                <Controller
                  name="newPassword"
                  control={control}
                  rules={{
                    required: t("rule"),
                    minLength: { value: 8, message: "Kamida 8 ta belgi" },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type={showNew ? "text" : "password"}
                      label={t("newPassword")}
                      error={Boolean(error)}
                      helperText={error?.message}
                      sx={inputSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenIcon
                              sx={{ fontSize: 16, color: "#b0ada6" }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => setShowNew((p) => !p)}
                              edge="end"
                            >
                              {showNew ? (
                                <VisibilityOffIcon sx={{ fontSize: 16 }} />
                              ) : (
                                <VisibilityIcon sx={{ fontSize: 16 }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                {/* Strength bars */}
                {newPassword.length > 0 && (
                  <Box sx={{ display: "flex", gap: "4px", mt: 1 }}>
                    {[1, 2, 3, 4].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          flex: 1,
                          height: "2px",
                          borderRadius: "1px",
                          bgcolor:
                            i <= strength
                              ? strengthColors[strength]
                              : "#e8e4dc",
                          transition: "background-color 0.25s",
                        }}
                      />
                    ))}
                  </Box>
                )}

                {/* Requirements */}
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {rules.map((r) => (
                    <Box
                      key={r.id}
                      sx={{ display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      {r.met ? (
                        <CheckCircleOutlineIcon
                          sx={{ fontSize: 13, color: "#3B6D11" }}
                        />
                      ) : (
                        <RadioButtonUncheckedIcon
                          sx={{ fontSize: 13, color: "#c8c4bc" }}
                        />
                      )}
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: r.met ? "#3B6D11" : "#9e9890",
                          transition: "color 0.2s",
                        }}
                      >
                        {r.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Confirm password */}
              <Box>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{ required: t("rule") }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type={showConfirm ? "text" : "password"}
                      label={t("confirmNewPw")}
                      error={
                        Boolean(error) ||
                        (confirmPassword.length > 0 && !passwordsMatch)
                      }
                      sx={{
                        ...inputSx,
                        ...(passwordsMatch && {
                          "& .MuiOutlinedInput-root fieldset": {
                            borderColor: "#3B6D11 !important",
                          },
                        }),
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ fontSize: 16, color: "#b0ada6" }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => setShowConfirm((p) => !p)}
                              edge="end"
                            >
                              {showConfirm ? (
                                <VisibilityOffIcon sx={{ fontSize: 16 }} />
                              ) : (
                                <VisibilityIcon sx={{ fontSize: 16 }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {confirmPassword.length > 0 && (
                  <Typography
                    sx={{
                      fontSize: 12,
                      mt: 0.5,
                      color: passwordsMatch ? "#3B6D11" : "#E24B4A",
                    }}
                  >
                    {passwordsMatch ? t("pwdMatch") : t("pwdNoMatch")}
                  </Typography>
                )}
              </Box>

              {/* Actions */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  mt: 0.5,
                }}
              >
                <Button
                  type="submit"
                  fullWidth
                  disabled={!allValid}
                  sx={{
                    bgcolor: "#1a1916",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: 13,
                    fontWeight: 500,
                    textTransform: "none",
                    py: 1.3,
                    "&:hover": { bgcolor: "#3d3b35" },
                    "&:disabled": { bgcolor: "#e8e4dc", color: "#b0ada6" },
                  }}
                >
                  {t("change")}
                </Button>
                <Button
                  fullWidth
                  onClick={() => navigate(-1)}
                  sx={{
                    bgcolor: "transparent",
                    color: "#9e9890",
                    borderRadius: "8px",
                    fontSize: 13,
                    fontWeight: 400,
                    textTransform: "none",
                    py: 1.2,
                    border: "0.5px solid #e8e4dc",
                    "&:hover": {
                      bgcolor: "#faf9f7",
                      color: "#1a1916",
                      borderColor: "#b0ada6",
                    },
                  }}
                >
                  {t("cancel")}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default ChangePassword;
