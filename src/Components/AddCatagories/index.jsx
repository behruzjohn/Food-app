import { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
// const CREATE_CATAGORIES = gql`
//   mutation CreateCategory($name: String!, $image: String!) {
//     createCategory(category: { name: $name, image: $image }) {
//       payload {
//         _id
//         name
//         image
//       }
//     }
//   }
// `;

function AddCatagories({ open, setOpen, onAdd }) {
  const { t } = useTranslation();
  // const [fetchCatagories, { data, loading, error }] =
  //   useMutation(CREATE_CATAGORIES);
  // const handleAdd = async () => {
  //   await fetchCatagories({
  //     variables: {
  //       name: 'Fast Food',
  //       image: 'https://example.com/image.png',
  //     },
  //   });
  // };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      discount: '',
      shortName: '',
      category: '',
      price: '',
      image: '',
    },
  });
  const onSubmit = (data) => {
    console.log(data.image);
    onAdd(data);
    reset();
    handleClose();
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Category</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="name"
              control={control}
              rules={{
                required: { value: true, message: 'Category name is required' },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label={t('categoryNamePlaceHolder')}
                  fullWidth
                />
              )}
            ></Controller>

            <Controller
              name="image"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: t('categoryImageReq'),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label={t('categoryImgUrl')}
                  fullWidth
                />
              )}
            ></Controller>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('cancel')}</Button>
            <Button type="submit" variant="contained" color="success">
              {t('add')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddCatagories;
