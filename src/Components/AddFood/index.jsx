import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { gql } from '@apollo/client';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react';
import Loader from '../Loader';
const GET_ALL_CATAGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      payload {
        _id
        name
        image
      }
    }
  }
`;
const GET_FOOD_BY_ID = gql`
  query GetFoodById($foodId: ID!) {
    getFoodById(foodId: $foodId) {
      payload {
        _id
        shortName
        name
        image
        description
        price
        discount
        likes
        isFavorite
      }
    }
  }
`;
function AddFood({ open, setOpen, onAdd, editedFoodId }) {
  const [getFoodById, { datas, load, err }] = useLazyQuery(GET_FOOD_BY_ID);
  useEffect(() => {
    if (editedFoodId) {
      getFoodById({
        variables: {
          foodId: editedFoodId,
        },
      });
    }
  }, [editedFoodId, getFoodById]);
  const [getCategories, { data, loading, error }] =
    useLazyQuery(GET_ALL_CATAGORIES);

  useEffect(() => {
    if (open) {
      getCategories();
    }
  }, [open]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      shortName: '',
      description: '',
      price: '',
      discount: '',
      category: '',
      image: '',
    },
  });

  useEffect(() => {
    if (datas?.getFoodById?.payload) {
      reset({
        name: datas?.getFoodById.payload.name || '',
        shortName: datas?.getFoodById.payload.shortName || '',
        description: datas?.getFoodById.payload.description || '',
        price: datas?.getFoodById.payload.price || '',
        discount: datas?.getFoodById.payload.discount || '',
        category: datas?.getFoodById.payload.category?._id || '',
        image: datas?.getFoodById.payload.image || '',
      });
    }
  }, [datas, reset]);

  const onSubmit = (data) => {
    console.log(data.image);
    onAdd(data);
    reset();
    handleClose();
  };

  const handleClose = () => setOpen(false);
  const categories = data?.getAllCategories?.payload || [];

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Food</DialogTitle>
        <form
          style={{ zIndex: 9999999999999 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Controller
              name="name"
              control={control}
              rules={{
                required: { message: 'Food name is required' },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  required={true}
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label="Food Name"
                  fullWidth
                />
              )}
            ></Controller>
            <Controller
              name="shortName"
              control={control}
              rules={{
                required: { message: 'Short name is required' },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label="Food Short Name"
                  fullWidth
                />
              )}
            ></Controller>
            <Controller
              name="category"
              control={control}
              rules={{
                required: { message: 'Category is required' },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  required={true}
                  {...field}
                  select
                  label="Category"
                  margin="dense"
                  fullWidth
                  error={Boolean(error)}
                  helperText={error?.message}
                >
                  {categories?.map((categories) => (
                    <MenuItem key={categories._id} value={categories._id}>
                      {categories.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{
                required: { message: 'Description is required' },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label="Desctiption"
                  fullWidth
                />
              )}
            ></Controller>
            <Controller
              name="price"
              control={control}
              rules={{
                required: { message: 'Food price is required' },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  required={true}
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label="Food Price"
                  fullWidth
                />
              )}
            ></Controller>
            <Controller
              name="discount"
              control={control}
              rules={{
                required: { message: 'Food discount is required' },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label="Food Discount"
                  fullWidth
                />
              )}
            ></Controller>
            <Controller
              name="image"
              control={control}
              rules={{
                required: { message: 'Image  is required' },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  required
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label="Food Image Url"
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

export default AddFood;
