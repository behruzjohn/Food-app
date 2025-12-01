import { useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function AddCatagories({
  open,
  setOpen,
  onAdd,
  editedCategory,
  setEditedCategory,
}) {
  const { t } = useTranslation();

  const defaultValues = {
    name: '',
    description: '',
    discount: '',
    shortName: '',
    category: '',
    price: '',
    image: '',
  };

  const { control, handleSubmit, reset } = useForm({ defaultValues });

  useEffect(() => {
    if (editedCategory) {
      reset({
        name: editedCategory.name || '',
        description: editedCategory.description || '',
        discount: editedCategory.discount || '',
        shortName: editedCategory.shortName || '',
        category: editedCategory.category || '',
        price: editedCategory.price || '',
        image: editedCategory.image || '',
      });
    } else {
      reset({
        name: '',
        description: '',
        discount: '',
        shortName: '',
        category: '',
        price: '',
        image: '',
      });
    }
  }, [editedCategory, reset]);

  useEffect(() => {
    if (open && !editedCategory) {
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
    handleClose();
    setEditedCategory(null);
  };

  const handleClose = () => {
    reset(defaultValues);
    setOpen(false);
    setEditedCategory(null);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {editedCategory?.length ? t('categoryTitle') : t('addNewCategory')}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            rules={{ required: { value: true, message: t('categoryNameReq') } }}
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
          />
          <Controller
            name="image"
            control={control}
            rules={{
              required: { value: true, message: t('categoryImageReq') },
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            type="submit"
            variant="contained"
            color="success"
          >
            {editedCategory?.length ? t('update') : t('add')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddCatagories;
