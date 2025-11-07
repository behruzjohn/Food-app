import {
  Autocomplete,
  Button,
  Input,
  InputAdornment,
  TextField,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Controller, useForm } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input';
import { StyleForgotPassword } from './StyleForgotPassword';
import { StyleContainer } from '../../../../ContainerCss';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
const options = ['user', 'admin'];

const FORGOT_PASSWORD = gql`
  mutation ChangeUserPasswordById(
    $oldPassword: String!
    $newPassword: String!
  ) {
    changeUserPasswordById(
      data: { oldPassword: $oldPassword, newPassword: $newPassword }
    ) {
      payload {
        _id
        name
        phone
        role
      }
    }
  }
`;
function ForgotPasswordPage() {
  const [changePassword, { loading, error }] = useMutation(FORGOT_PASSWORD);
  const [succsesMessage, setSuccsesMessage] = useState('');
  const { control, handleSubmit } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });
  const onSumbut = async (formDate) => {
    try {
      const res = await changePassword({
        variables: {
          oldPassword: formDate.oldPassword,
          newPassword: formDate.newPassword,
        },
      });
      setSuccsesMessage('Password changed successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyleForgotPassword className="signIn">
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
                    name="old-password"
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
                        type="password"
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
                        }}
                      />
                    )}
                  ></Controller>
                  <Controller
                    name="new-password"
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
                        type="password"
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
                        }}
                      />
                    )}
                  ></Controller>

                  <Button type="submit" color="error" variant="contained">
                    CHANGE
                  </Button>
                </div>
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                {succsesMessage && (
                  <p style={{ color: 'green' }}>{succsesMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </StyleContainer>
    </StyleForgotPassword>
  );
}
export default ForgotPasswordPage;
