import { useState } from 'react';
import { FORGOT_PASSWORD } from './api';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { Controller, useForm } from 'react-hook-form';
import { StyleContainer } from '../../../ContainerCss';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { StyleForgotPassword } from './StyleForgotPassword';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

function ForgotPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate('');
  const [succsesMessage, setSuccsesMessage] = useState('');
  const [newPasswordHide, setnewPasswordHide] = useState(false);
  const [oldPasswordHide, setoldPasswordHide] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const [changePassword, { error }] = useMutation(FORGOT_PASSWORD);

  function handleClickShowPassword() {
    setnewPasswordHide((prev) => !prev);
  }
  function handleClickShowPassword2() {
    setoldPasswordHide((prev) => !prev);
  }

  const onSumbut = async (formDate) => {
    try {
      const res = await changePassword({
        variables: {
          data: {
            oldPassword: formDate.oldPassword,
            newPassword: formDate.newPassword,
          },
        },
      });
      if (res) {
        navigate('/sign-in');
      }
      setSuccsesMessage('Password changed successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyleForgotPassword className="signIn">
      <Button
        style={{ marginTop: 20, marginLeft: 20 }}
        onClick={() => navigate('/order-list')}
        variant="outlined"
        startIcon={<ArrowBackIosNewOutlinedIcon />}
      >
        {t('gooBack')}
      </Button>
      <StyleContainer>
        <div className="sign-in-nav">
          <div className="form">
            <div className="form-nav">
              <div className="texts">
                <h1>Forgot-Password</h1>
              </div>
              <form onSubmit={handleSubmit(onSumbut)}>
                <div className="inputs">
                  <Controller
                    name="oldPassword"
                    control={control}
                    rules={{
                      required: {
                        value: true,

                        message: 'Password Max lenght 8',
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        type={oldPasswordHide ? 'text' : 'password'}
                        error={Boolean(error)}
                        id="outlined-controlled"
                        helperText={error?.message}
                        placeholder="Old Password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOpenIcon />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment
                              style={{ cursor: 'pointer' }}
                              position="end"
                            >
                              <IconButton
                                onClick={handleClickShowPassword2}
                                edge="end"
                              >
                                {oldPasswordHide ? (
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
                  ></Controller>
                  <Controller
                    name="newPassword"
                    control={control}
                    rules={{
                      required: {
                        value: true,

                        message: 'New Password Max lenght 8',
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        type={newPasswordHide ? 'text' : 'password'}
                        error={Boolean(error)}
                        id="outlined-controlled"
                        helperText={error?.message}
                        placeholder="New Password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOpenIcon />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment
                              style={{ cursor: 'pointer' }}
                              position="end"
                            >
                              <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {newPasswordHide ? (
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
                  ></Controller>

                  <Button type="submit" color="success" variant="contained">
                    {t('change')}
                  </Button>
                </div>
              </form>
            </div>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            {succsesMessage && (
              <p style={{ color: 'green' }}>{succsesMessage}</p>
            )}
          </div>
        </div>
      </StyleContainer>
    </StyleForgotPassword>
  );
}
export default ForgotPasswordPage;
