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
import { useLazyQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        <DialogTitle>{t('addNewFood')}</DialogTitle>
        <form
          style={{ zIndex: 9999999999999 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Controller
              name="name"
              control={control}
              rules={{
                required: { message: t('foodNameReq') },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  required={true}
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label={t('foodName')}
                  fullWidth
                />
              )}
            ></Controller>
            <Controller
              name="shortName"
              control={control}
              rules={{
                required: { message: t('foodShortNameReq') },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label={t('foodShortName')}
                  fullWidth
                />
              )}
            ></Controller>
            <Controller
              name="category"
              control={control}
              rules={{
                required: { message: t('categoryReq') },
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
                required: { message: t('descriptionReq') },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label={t('foodDescription')}
                  fullWidth
                />
              )}
            ></Controller>
            <Controller
              name="price"
              control={control}
              rules={{
                required: { message: t('foodPriceReq') },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  required={true}
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label={t('foodPrice')}
                  fullWidth
                />
              )}
            ></Controller>
            <Controller
              name="discount"
              control={control}
              rules={{
                required: { message: t('foodDiscount') },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label={t('foodDiscount')}
                  fullWidth
                />
              )}
            ></Controller>
            <Controller
              name="image"
              control={control}
              rules={{
                required: { message: t('foodImgReq') },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  required
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  margin="dense"
                  label={t('foodImgUrl')}
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

export default AddFood;
