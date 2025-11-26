import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { SIGN_IN } from './api';
import { useState } from 'react';
import { useLang } from '../../useLang';
import { MuiTelInput } from 'mui-tel-input';
import { StyleSignIn } from './StyleSign-in';
import { useUserStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/index';
import { useLazyQuery } from '@apollo/client/react';
import { Controller, useForm } from 'react-hook-form';
import { StyleContainer } from '../../../ContainerCss';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const options = ['user', 'admin'];

function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate('');
  const { lang, setLang } = useLang();
  const [load, setLoad] = useState(false);
  const [isHide, setHide] = useState(false);
  const [signInFetchEror, setSignInFetchEror] = useState('');

  const setUserRole = useUserStore((state) => state.setUserRole);
  const setToken = useUserStore((state) => state.setToken);

  const [fetchSignIn, { loading }] = useLazyQuery(SIGN_IN);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      role: '',
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (formData) => {
    try {
      setLoad(true);
      const res = await fetchSignIn({
        variables: {
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        },
      });
      localStorage.setItem('userId', res?.data?.signIn?.user?._id);
      console.log(res?.data?.signIn?.user);
      setUserRole(res?.data?.signIn?.user?.role);

      if (res?.data?.signIn?.token) {
        setToken(res?.data?.signIn?.token);
        localStorage.setItem('userName', res?.data?.signIn?.user?.name);
        navigate('/order-list');
      }
      if (!formData.role) {
        setSignInFetchEror('Please select a role');
        setLoad(false);
        return;
      }
      if (loading) {
        setLoad(false);
      }
    } catch (err) {
      console.log(err);

      setLoad(false);
      setSignInFetchEror(err.message || 'Something went wrong');
    }
  };

  const handleChange = (event) => {
    const newLang = event.target.value;
    setLang(newLang);
  };

  function handleClickShowPassword() {
    setHide((prev) => !prev);
  }

  return (
    <>
      <Loader load={load}></Loader>
      <StyleSignIn className="signIn">
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
            variant="outlined"
            style={{ backgroundColor: 'azure', borderRadius: 10 }}
            className="selectId"
          >
            <InputLabel id="lang-select-label">{t('lang')}</InputLabel>

            <Select
              className="select"
              style={{ height: 40 }}
              labelId="lang-select-label"
              id="lang-select"
              value={lang}
              label="Lang"
              onChange={handleChange}
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
          <div className="sign-in-nav">
            <div className="form">
              <div className="form-nav">
                <div className="texts">
                  <h1>{t('login')}</h1>
                  <p>{t('signUpDesc')}</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="inputs">
                    <Controller
                      name="role"
                      control={control}
                      rules={{ required: t('roleIsReq') }}
                      render={({
                        fieldState: { error },
                        field: { onChange, value },
                      }) => (
                        <Autocomplete
                          options={options}
                          value={value}
                          onChange={(_, newValue) => onChange(newValue)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(error)}
                              label="User type"
                              helperText={error?.message}
                            />
                          )}
                          sx={{ width: 320 }}
                        />
                      )}
                    />
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: t('phoneNum'),
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <MuiTelInput
                          {...field}
                          error={Boolean(error)}
                          helperText={error?.message}
                          placeholder={t('enterYourPhoneNUm')}
                        ></MuiTelInput>
                      )}
                    />
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: t('passwordReq'),
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          type={isHide ? 'password' : 'text'}
                          error={Boolean(error)}
                          id="outlined-controlled"
                          helperText={error?.message}
                          placeholder="Password"
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
                    <p
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <a href="/sign-up">{t('dontHaveAcc')}</a>
                    </p>
                    <Button type="submit" color="error" variant="contained">
                      {t('login')}
                    </Button>
                  </div>
                </form>
                {signInFetchEror && (
                  <p
                    style={{
                      color: 'red',
                      marginTop: '10px',
                      marginLeft: '30px',
                      fontSize: '18px',
                    }}
                  >
                    {signInFetchEror} !
                  </p>
                )}
              </div>
            </div>
          </div>
        </StyleContainer>
      </StyleSignIn>
    </>
  );
}
export default SignIn;
