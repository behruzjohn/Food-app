import {
  Autocomplete,
  Button,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from '@mui/material';
import { StyleContainer } from '../../../ContainerCss';
import { StyleSignIn } from './StyleSign-in';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import Loader from '../../Components/Loader/index';
import { useUserStore } from '../../../store';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const options = ['user', 'admin'];
function SignIn() {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate('');
  const [signInFetchEror, setSignInFetchEror] = useState('');
  const [isHide, setHide] = useState(false);

  const setUserRole = useUserStore((state) => state.setUserRole);
  const setToken = useUserStore((state) => state.setToken);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      role: '',
      phone: '',
      password: '',
    },
  });
  const SIGN_IN = gql`
    query SignIn($phone: String!, $password: String!, $role: RoleEnum!) {
      signIn(data: { phone: $phone, password: $password }, role: $role) {
        token
        user {
          _id
          name
          phone
          role
        }
      }
    }
  `;
  const [fetchSignIn, { data, loading, error }] = useLazyQuery(SIGN_IN);

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

  function handleClickShowPassword() {
    setHide((prev) => !prev);
  }

  return (
    <>
      <Loader load={load}></Loader>
      <StyleSignIn className="signIn">
        <StyleContainer>
          <div className="sign-in-nav">
            <div className="form">
              <div className="form-nav">
                <div className="texts">
                  <h1>Login</h1>
                  <p>
                    More than <span>15,000 recipts</span> from around the world!
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="inputs">
                    <Controller
                      name="role"
                      control={control}
                      rules={{ required: 'Role is required' }}
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
                          message: 'Phone is required',
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <MuiTelInput
                          {...field}
                          error={Boolean(error)}
                          helperText={error?.message}
                          placeholder="Enter your phone number"
                        ></MuiTelInput>
                      )}
                    />
                    <Controller
                      name="password"
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
                          type={!isHide ? 'password' : 'text'}
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
                      <a href="/sign-up">Don't have an accaount?</a>
                    </p>
                    <Button type="submit" color="error" variant="contained">
                      LOGIN
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
