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

function AddCatagories({ open, setOpen, onAdd }) {
  const { t } = useTranslation();
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
        <DialogTitle>{t('addNewCategory')}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="name"
              control={control}
              rules={{
                required: { value: true, message: t('categoryNameReq') },
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
            <Button
              startIcon={<AddCircleOutlineIcon />}
              type="submit"
              variant="contained"
              color="success"
            >
              {t('add')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddCatagories;
