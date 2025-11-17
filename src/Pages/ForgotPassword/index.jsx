import {
  Autocomplete,
  Button,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Controller, useForm } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input';
import { StyleForgotPassword } from './StyleForgotPassword';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { StyleContainer } from '../../../ContainerCss';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

const FORGOT_PASSWORD = gql`
  mutation ChangeUserPasswordById($data: UpdateUserPasswordInput!) {
    changeUserPasswordById(data: $data) {
      payload {
        _id
        name
        phone
        role
        photo
        telegramId
        createdAt
        updatedAt
      }
    }
  }
`;
function ForgotPasswordPage() {
  const navigate = useNavigate('');
  const [isHide, setIsHide] = useState(false);
  const [isHide2, setIsHide2] = useState(false);
  const { t } = useTranslation();
  const [changePassword, { data, loading, error }] =
    useMutation(FORGOT_PASSWORD);
  const [succsesMessage, setSuccsesMessage] = useState('');
  const { control, handleSubmit } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });
  const onSumbut = async (formDate) => {
    console.log(formDate, formDate);

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
  function handleClickShowPassword() {
    setIsHide((prev) => !prev);
  }
  function handleClickShowPassword2() {
    setIsHide2((prev) => !prev);
  }

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
                        type={isHide2 ? 'text' : 'password'}
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
                                {isHide2 ? (
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
                        type={isHide ? 'text' : 'password'}
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
                                {isHide ? (
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
                    CHANGE
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
