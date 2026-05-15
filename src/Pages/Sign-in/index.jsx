import {
  Autocomplete,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { SIGN_IN } from "./api";
import { useState } from "react";
import { MuiTelInput } from "mui-tel-input";
import { StyleSignIn } from "./StyleSign-in";
import { useUserStore } from "../../../store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/index";
import { useLazyQuery } from "@apollo/client/react";
import { Controller, useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const roleOptions = ["user", "admin"];

function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const setUserRole = useUserStore((state) => state.setUserRole);
  const setToken = useUserStore((state) => state.setToken);

  const [fetchSignIn, { loading }] = useLazyQuery(SIGN_IN);

  const { control, handleSubmit } = useForm({
    defaultValues: { role: "", phone: "", password: "" },
  });

  const onSubmit = async (formData) => {
    if (!formData.role) {
      setFetchError(t("roleIsReq"));
      return;
    }
    setFetchError("");
    setLoad(true);
    try {
      const res = await fetchSignIn({
        variables: {
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        },
      });
      const user = res?.data?.signIn?.user;
      const token = res?.data?.signIn?.token;
      if (token) {
        setToken(token);
        setUserRole(user?.role);
        localStorage.setItem("userId", user?._id);
        localStorage.setItem("userName", user?.name);
        navigate("/foods");
      }
    } catch (err) {
      setFetchError(err.message || t("login"));
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <Loader load={load} />
      <StyleSignIn>
        <div className="sign-in-nav">
          <div className="form">
            {/* Header */}
            <div className="form-header">
              <div className="form-icon">
                <LoginIcon />
              </div>
              <div className="form-header-text">
                <h1>{t("login")}</h1>
                <p>{t("signUpDesc")}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="inputs">
                {/* Role */}
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: t("roleIsReq") }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      options={roleOptions}
                      value={value || null}
                      onChange={(_, newValue) => onChange(newValue || "")}
                      isOptionEqualToValue={(o, v) => o === v}
                      clearOnEscape
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t("userType")}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                {/* Phone */}
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: { value: true, message: t("phoneNum") } }}
                  render={({ field, fieldState: { error } }) => (
                    <MuiTelInput
                      {...field}
                      defaultCountry="UZ"
                      error={Boolean(error)}
                      helperText={error?.message}
                      placeholder={t("enterYourPhoneNUm")}
                    />
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: { value: true, message: t("passwordReq") },
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

                <a href="/sign-up" className="form-link">
                  {t("dontHaveAcc")}
                </a>

                <Button
                  type="submit"
                  className="submit-btn"
                  variant="contained"
                >
                  {t("login")}
                </Button>
              </div>
            </form>

            {fetchError && <p className="error-msg">{fetchError}</p>}
          </div>
        </div>
      </StyleSignIn>
    </>
  );
}

export default SignIn;
