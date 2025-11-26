import { useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useLazyQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { GET_ALL_CATAGORIES, GET_FOOD_BY_ID } from './api';

function AddFood({ open, setOpen, onAdd, editedFoodId }) {
  const { t } = useTranslation();

  const [getFoodById, { data: foodData }] = useLazyQuery(GET_FOOD_BY_ID);
  const [getCategories, { data, loading }] = useLazyQuery(GET_ALL_CATAGORIES);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      discount: '',
      category: '',
      image: '',
    },
  });

  useEffect(() => {
    if (editedFoodId) {
      getFoodById({
        variables: {
          foodId: editedFoodId,
        },
      });
    }
  }, [editedFoodId, getFoodById]);

  useEffect(() => {
    if (open) {
      getCategories();
    }
  }, [open]);

  useEffect(() => {
    if (foodData && editedFoodId) {
      const food = foodData?.getFoodById?.payload;

      reset({
        name: food?.name || '',
        description: food?.description || '',
        price: food?.price || '',
        discount: food?.discount || '',
        category: food?.category?._id || '',
        image: food?.image || '',
      });
    }
  }, [foodData]);

  useEffect(() => {
    if (open && !editedFoodId) {
      reset({
        name: '',
        description: '',
        price: '',
        discount: '',
        category: '',
        image: '',
      });
    }
  }, [open]);

  const onSubmit = (data) => {
    onAdd(data);
    reset();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

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
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          {loading && <CircularProgress size={20} />}
                        </InputAdornment>
                      ),
                    },
                  }}
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
                  type="number"
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
                  type="number"
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
              rules={{ required: { message: t('foodImgReq') } }}
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
            />
            <DialogActions style={{ marginTop: 10 }}>
              <Button onClick={handleClose}>{t('cancel')}</Button>
              {!editedFoodId ? (
                <Button
                  startIcon={<AddIcon />}
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  {t('add')}
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="success">
                  {t('update')}
                </Button>
              )}
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default AddFood;
