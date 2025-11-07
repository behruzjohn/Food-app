import {
  Autocomplete,
  Box,
  Button,
  Input,
  InputAdornment,
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
import Loader from '../Loader';

function SignUp() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(0);
  const [confirmError, setConfirmError] = useState('');
  const [erorFetch, setErorFetch] = useState('');
  const [loaderr, setLoad] = useState(false);
  const navigate = useNavigate('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
    width: 360,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  };
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
    } catch (error) {
      setConfirmError(error.message || 'Something went wrong');
      setOpen(true);
      setLoad(false);
    }
  }

  return (
    <>
      <Loader load={loaderr}></Loader>
      <StyleSignUp className="signUp">
        <StyleContainer>
          <div className="sign-up-nav">
            <div className="form">
              <div className="form-nav">
                <div className="texts">
                  <h1>SIGN-UP</h1>
                  <p>
                    More than <span>15,000 recipts</span> from around the world!
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="inputs">
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'Name is required',
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          type="text"
                          error={Boolean(error)}
                          id="outlined-controlled"
                          helperText={error?.message}
                          placeholder="Enter your name"
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
                          message: 'Password min lenght 4, max lenght 8',
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          type="password"
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
                          }}
                        />
                      )}
                    ></Controller>

                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'Password min lenght 4, max lenght 8',
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          type="password"
                          error={Boolean(error)}
                          id="outlined-controlled"
                          helperText={error?.message}
                          placeholder="Confirm Password"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockOpenIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    ></Controller>

                    <p>
                      <a href="/sign-in">You have allready have an account?</a>
                    </p>
                    <Button type="submit" color="warning" variant="contained">
                      SIGN-UP
                    </Button>
                  </div>
                </form>
                {erorFetch && (
                  <p
                    style={{
                      color: 'red',
                      marginTop: '10px',
                      marginLeft: '30px',
                      fontSize: '18px',
                    }}
                  >
                    {erorFetch} !
                  </p>
                )}
              </div>
            </div>
          </div>
        </StyleContainer>
        <div className="modal">
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2 style={{ margin: 0, color: '#ff9800' }}>
                We sent you an SMS code!
              </h2>

              <p style={{ color: '#555', fontSize: 14 }}>
                Please enter the 5-digit code we sent to your phone.
              </p>

              <div
                style={{ display: 'flex', alignItems: 'center', gap: 15 }}
                className="modal-text"
              >
                <input
                  onChange={(e) => setCode(e.target.value)}
                  style={{
                    height: 35,
                    borderRadius: 4,
                    marginTop: 18,
                    paddingLeft: 10,
                  }}
                  type="text"
                  placeholder="Enter code..."
                  className="sms-input"
                />
                <Button
                  onClick={() => handleClickConfirm()}
                  variant="contained"
                  color="warning"
                  sx={{
                    borderRadius: '12px',
                    mt: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                  }}
                >
                  Confirm
                </Button>
              </div>
              {confirmError && (
                <p
                  style={{ color: 'red', marginTop: '10px', fontSize: '17px' }}
                >
                  {confirmError}
                </p>
              )}
            </Box>
          </Modal>
        </div>
      </StyleSignUp>
    </>
  );
}
export default SignUp;
