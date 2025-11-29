import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Select } from '@mui/material';
import { useLang } from '../../useLang';
import { MuiTelInput } from 'mui-tel-input';
import { StyleSignUp } from './StyleSign-up';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CONFIRM_SIGN_UP, SIGN_UP } from './api';
import { useMutation } from '@apollo/client/react';
import Loader from '../../Components/Loader/index';
import PersonIcon from '@mui/icons-material/Person';
import { Controller, useForm } from 'react-hook-form';
import { StyleContainer } from '../../../ContainerCss';
import SentCode from '../../Components/SentCodeSignUp';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate('');
  const [code, setCode] = useState(0);
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [loaderr, setLoad] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [isHide2, setIsHide2] = useState(false);
  const [erorFetch, setErorFetch] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(null);

  const langFromDB = 'en';

  const [confirmError, setConfirmError] = useState('');

  const [fetch, { data }] = useMutation(SIGN_UP);
  const [fetchConfirm] = useMutation(CONFIRM_SIGN_UP);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

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

  const onSubmit = async (formData) => {
    setPhoneNumber(formData?.phone);
    if (formData.password !== formData.confirmPassword) {
      setErorFetch('Passwords do not match');
      return;
    }
    setErorFetch('');
    setLoad(true);

    console.log(formData);
    try {
      const res = await fetch({ variables: formData });

      if (res.data?.signUp?.token) {
        navigate('/verify', {
          state: {
            phone: phoneNumber,
            token: res.data?.signUp?.token,
          },
        });
      }
    } catch (err) {
      setErorFetch(err.message || 'Something went wrong');
      setLoad(false);
    }
  };

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

  return (
    <>
      <Loader load={loaderr}></Loader>
      <StyleSignUp className="signUp">
        <div className="lang">
          <FormControl
            style={{ backgroundColor: '#fff', borderRadius: 10 }}
            className="selectId"
          >
            <InputLabel id="lang-select-label">{t('lang')}</InputLabel>
            <Select
              value={lang || 'en'}
              labelId="lang-select-label"
              id="lang-select"
              onChange={handleChange}
              style={{ height: 40 }}
              MenuProps={{
                disableScrollLock: true,
                disableAutoFocusItem: true,
              }}
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
                          defaultCountry="UZ"
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
