import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { StyleContainer } from '../../../ContainerCss';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { StyleSignUp } from './StyleSign-up';
import { Controller, useForm } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input';
import PhoneIcon from '@mui/icons-material/Phone';
import { useMutation } from '@apollo/client/react';
import PersonIcon from '@mui/icons-material/Person';
import { gql } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/index';
import { useLang } from '../../useLang';
import { Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SentCode from '../../Components/SentCodeSignUp';

function SignUp() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(0);
  const [confirmError, setConfirmError] = useState('');
  const [erorFetch, setErorFetch] = useState('');
  const [loaderr, setLoad] = useState(false);
  const navigate = useNavigate('');
  const { lang, setLang } = useLang();
  const { t } = useTranslation();
  const [isHide, setIsHide] = useState(false);
  const [isHide2, setIsHide2] = useState(false);

  const SIGN_UP = gql`
    mutation SignUp($name: String!, $phone: String!, $password: String!) {
      signUp(data: { name: $name, phone: $phone, password: $password }) {
        token
      }
    }
  `;

  const [fetch, { data, loading, error }] = useMutation(SIGN_UP);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setErorFetch('Passwords do not match');
      return;
    }
    setErorFetch('');
    console.log(formData);

    setOpen(true);

    try {
      const res = await fetch({ variables: formData });
      if (res.data?.signUp?.token) {
        setOpen(true);
        setLoad(false);
      }
    } catch (err) {
      setErorFetch(err.message || 'Something went wrong');
      setOpen(false);
      setLoad(false);
    }
  };

  const CONFIRM_SIGN_UP = gql`
    mutation ConfirmSignUp($code: String!, $token: String!) {
      confirmSignUp(data: { code: $code, token: $token }) {
        token
        user {
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
  const [fetchConfirm, { val, load, err }] = useMutation(CONFIRM_SIGN_UP);
  console.log(err);

  async function handleClickConfirm() {
    try {
      setLoad(true);
      setConfirmError('');

      const res = await fetchConfirm({
        variables: {
          code: String(code),
          token: data?.signUp?.token,
        },
      });

      if (res?.data?.confirmSignUp?.token) {
        localStorage.setItem('token', res.data.confirmSignUp.token);
        setOpen(false);
        setLoad(false);
        navigate('/sign-in');
      }
    } catch (err) {
      setErorFetch(err.message);
      setConfirmError(err.message);
      setLoad(false);
    }
  }
  const handleChange = (event) => {
    const newLang = event.target.value;
    setLang(newLang);
  };
  function handleClickShowPassword() {
    setIsHide((prev) => !prev);
  }
  function handleClickShowPassword2() {
    setIsHide2((prev) => !prev);
  }

  return (
    <>
      <Loader load={loaderr}></Loader>
      <StyleSignUp className="signUp">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: 30,
            position: 'relative',
            top: 20,
          }}
          className="lang"
        >
          <FormControl
            style={{ backgroundColor: 'azure', borderRadius: 10 }}
            className="selectId"
          >
            <InputLabel id="lang-select-label">Lang</InputLabel>
            <Select
              className="select"
              style={{ height: 40 }}
              labelId="lang-select-label"
              id="lang-select"
              value={lang}
              label="Lang"
              onChange={handleChange}
            >
              <MenuItem value="en">En</MenuItem>
              <MenuItem value="uz">Uz</MenuItem>
              <MenuItem value="ru">Ru</MenuItem>
            </Select>
          </FormControl>
        </div>
        <StyleContainer>
          <div className="sign-up-nav">
            <div className="form">
              <div
                style={{ position: 'relative', bottom: 12 }}
                className="form-nav"
              >
                <div className="texts">
                  <h1>{t('signUp')}</h1>
                  <p>{t('signUpDesc')}</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="inputs">
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: t('nameIsReq'),
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          type="text"
                          error={Boolean(error)}
                          id="outlined-controlled"
                          helperText={error?.message}
                          placeholder={t('namePlaceHolder')}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: t('phoneReq'),
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <MuiTelInput
                          {...field}
                          error={Boolean(error)}
                          helperText={error?.message}
                          placeholder={t('phonePlaceHolder')}
                        ></MuiTelInput>
                      )}
                    />
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: t('rule'),
                        minLength: {
                          value: 8,
                          message: `Min 8 ${t('characters')} `,
                        },
                        maxLength: {
                          value: 16,
                          message: `Max 16 ${t('characters')}`,
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          type={!isHide ? 'password' : 'text'}
                          error={Boolean(error)}
                          id="outlined-controlled"
                          helperText={error?.message}
                          placeholder={t('password')}
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

                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: t('rule'),
                        minLength: {
                          value: 8,
                          message: `Min 8'${t('characters')} `,
                        },
                        maxLength: {
                          value: 16,
                          message: `Max 16 ${t('characters')} `,
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          type={!isHide2 ? 'password' : 'text'}
                          error={Boolean(error)}
                          id="outlined-controlled"
                          helperText={error?.message}
                          placeholder={t('confirmPassword')}
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

                    <p>
                      <a href="/sign-in">{t('youHaveAccaunt')}</a>
                    </p>
                    <Button type="submit" color="warning" variant="contained">
                      {t('signUp')}
                    </Button>
                  </div>
                </form>
                {erorFetch && (
                  <p
                    style={{
                      color: 'red',
                      marginTop: '10px',
                      marginLeft: '0px',
                      fontSize: '14px',
                    }}
                  >
                    {erorFetch} !
                  </p>
                )}
              </div>
            </div>
          </div>
        </StyleContainer>
        {open && (
          <SentCode
            setOpen={setOpen}
            setCode={setCode}
            handleClickConfirm={handleClickConfirm}
            confirmError={confirmError}
          />
        )}
      </StyleSignUp>
    </>
  );
}
export default SignUp;
