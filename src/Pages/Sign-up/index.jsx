import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { MuiTelInput } from "mui-tel-input";
import { StyleSignUp } from "./StyleSign-up";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SIGN_UP } from "./api";
import { useMutation } from "@apollo/client/react";
import Loader from "../../Components/Loader/index";
import PersonIcon from "@mui/icons-material/Person";
import { Controller, useForm } from "react-hook-form";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [fetch] = useMutation(SIGN_UP);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: { name: "", phone: "", password: "", confirmPassword: "" },
  });

  const password = watch("password");

  const onSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setFetchError(t("passwordReq"));
      return;
    }
    setFetchError("");
    setLoad(true);
    const role = formData.phone === "+998994846789" ? "admin" : "user";
    try {
      const res = await fetch({ variables: { ...formData, role } });
      if (res.data?.signUp?.token) {
        navigate("/verify", {
          state: { phone: formData.phone, token: res.data.signUp.token },
        });
      }
    } catch (err) {
      setFetchError(err.message || t("signUp"));
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <Loader load={load} />
      <StyleSignUp>
        <div className="sign-up-nav">
          <div className="form">
            {/* Header */}
            <div className="form-header">
              <div className="form-icon">
                <PersonAddIcon />
              </div>
              <div className="form-header-text">
                <h1>{t("signUp")}</h1>
                <p>{t("signUpDesc")}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="inputs">
                {/* Name */}
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: { value: true, message: t("nameIsReq") } }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="text"
                      error={Boolean(error)}
                      helperText={error?.message}
                      placeholder={t("namePlaceHolder")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                {/* Phone */}
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: { value: true, message: t("phoneReq") } }}
                  render={({ field, fieldState: { error } }) => (
                    <MuiTelInput
                      {...field}
                      defaultCountry="UZ"
                      error={Boolean(error)}
                      helperText={error?.message}
                      placeholder={t("phonePlaceHolder")}
                    />
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: t("rule"),
                    minLength: {
                      value: 8,
                      message: `Min 8 ${t("characters")}`,
                    },
                    maxLength: {
                      value: 16,
                      message: `Max 16 ${t("characters")}`,
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      error={Boolean(error)}
                      helperText={error?.message}
                      placeholder={t("password")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((p) => !p)}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                {/* Confirm password */}
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: t("rule"),
                    minLength: {
                      value: 8,
                      message: `Min 8 ${t("characters")}`,
                    },
                    maxLength: {
                      value: 16,
                      message: `Max 16 ${t("characters")}`,
                    },
                    validate: (v) => v === password || "Parollar mos kelmadi",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type={showConfirm ? "text" : "password"}
                      error={Boolean(error)}
                      helperText={error?.message}
                      placeholder={t("confirmPassword")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirm((p) => !p)}
                              edge="end"
                              size="small"
                            >
                              {showConfirm ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <a href="/sign-in" className="form-link">
                  {t("youHaveAccaunt")}
                </a>

                <Button
                  type="submit"
                  className="submit-btn"
                  variant="contained"
                >
                  {t("signUp")}
                </Button>
              </div>
            </form>

            {fetchError && <p className="error-msg">{fetchError}</p>}
          </div>
        </div>
      </StyleSignUp>
    </>
  );
}

export default SignUp;
