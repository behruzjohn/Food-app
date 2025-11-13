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
const CREATE_CATAGORIES = gql`
  mutation CreateCategory($name: String!, $image: String!) {
    createCategory(category: { name: $name, image: $image }) {
      payload {
        _id
        name
        image
      }
    }
  }
`;

function AddCatagories({ open, setOpen, onAdd }) {
  const [fetchCatagories, { data, loading, error }] =
    useMutation(CREATE_CATAGORIES);
  const handleAdd = async () => {
    await fetchCatagories({
      variables: {
        name: 'Fast Food',
        image: 'https://example.com/image.png',
      },
    });
  };

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
                required: { value: true, message: 'Food name is required' },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label="Category name"
                  fullWidth
                />
              )}
            ></Controller>

            <Controller
              name="image"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label="Category Image Url"
                  fullWidth
                />
              )}
            ></Controller>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="success">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddCatagories;
