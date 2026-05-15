import { useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  MenuItem,
  InputAdornment,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import { GET_ALL_CATAGORIES, GET_FOOD_BY_ID } from "./api";
import { formatPrice } from "../../helpers/formatters";
import { StyleAddFood } from "./StyleAddFood";

function AddFood({ open, onAdd, editedFoodId, onClose }) {
  const { t } = useTranslation();
  const isEdit = Boolean(editedFoodId);

  const [getFoodById, { data: foodData }] = useLazyQuery(GET_FOOD_BY_ID);
  const [getCategories, { data, loading }] = useLazyQuery(GET_ALL_CATAGORIES);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      discount: "",
      category: "",
      image: "",
    },
  });

  useEffect(() => {
    if (editedFoodId) getFoodById({ variables: { foodId: editedFoodId } });
  }, [editedFoodId, getFoodById]);

  useEffect(() => {
    if (open) getCategories();
  }, [open]);

  useEffect(() => {
    if (foodData && editedFoodId) {
      const food = foodData?.getFoodById?.payload;
      reset({
        name: food?.name || "",
        description: food?.description || "",
        price: food?.price || "",
        discount: food?.discount || "",
        category: food?.category?._id || "",
        image: food?.image || "",
      });
    }
  }, [foodData]);

  useEffect(() => {
    if (open && !editedFoodId) {
      reset({
        name: "",
        description: "",
        price: "",
        discount: "",
        category: "",
        image: "",
      });
    }
  }, [open]);

  const onSubmit = (data) => {
    onAdd(data);
    reset();
    handleClose();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const categories = data?.getAllCategories?.payload || [];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 12,
          border: "0.5px solid rgba(249,115,22,0.15)",
          boxShadow:
            "0 0 0 4px rgba(249,115,22,0.04), 0 24px 48px rgba(26,25,22,0.1)",
        },
      }}
    >
      <StyleAddFood>
        {/* Header */}
        <div className="dialog-head">
          <div className="dialog-head-left">
            <div className="dialog-icon">
              {isEdit ? <EditOutlinedIcon /> : <FastfoodOutlinedIcon />}
            </div>
            <div>
              <p className="dialog-title">
                {isEdit ? t("update") : t("addNewFood")}
              </p>
              <p className="dialog-subtitle">
                {isEdit ? t("updatedFood") : t("foodsDescription")}
              </p>
            </div>
          </div>
          <IconButton
            className="dialog-close"
            onClick={handleClose}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent style={{ padding: 0 }}>
            <div className="dialog-body">
              {/* Name */}
              <div>
                <label className="field-label">{t("foodName")}</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: { value: true, message: t("foodNameReq") },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      required
                      error={Boolean(error)}
                      helperText={error?.message}
                      placeholder="Masalan: Osh, Lag'mon..."
                      size="small"
                    />
                  )}
                />
              </div>

              {/* Category */}
              <div>
                <label className="field-label">{t("categories")}</label>
                <Controller
                  name="category"
                  control={control}
                  rules={{
                    required: { value: true, message: t("categoryReq") },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      select
                      required
                      size="small"
                      error={Boolean(error)}
                      helperText={error?.message}
                      InputProps={{
                        endAdornment: loading ? (
                          <InputAdornment
                            position="end"
                            style={{ marginRight: 24 }}
                          >
                            <CircularProgress
                              size={16}
                              style={{ color: "#F97316" }}
                            />
                          </InputAdornment>
                        ) : null,
                      }}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>

              {/* Description */}
              <div>
                <label className="field-label">{t("foodDescription")}</label>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: { value: true, message: t("descriptionReq") },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      multiline
                      rows={2}
                      error={Boolean(error)}
                      helperText={error?.message}
                      placeholder="Taom haqida qisqacha..."
                      size="small"
                    />
                  )}
                />
              </div>

              {/* Price + Discount */}
              <div className="row-2">
                <div>
                  <label className="field-label">{t("foodPrice")} (so'm)</label>
                  <Controller
                    name="price"
                    control={control}
                    rules={{
                      required: { value: true, message: t("foodPriceReq") },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        required
                        type="text"
                        {...field}
                        value={field.value ? formatPrice(field.value) : ""}
                        onChange={(e) => {
                          const numeric = e.target.value.replace(/\D/g, "");
                          field.onChange(Number(numeric));
                        }}
                        error={Boolean(error)}
                        helperText={error?.message}
                        placeholder="25 000"
                        size="small"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="field-label">{t("foodDiscount")} (%)</label>
                  <Controller
                    name="discount"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        type="number"
                        {...field}
                        error={Boolean(error)}
                        helperText={error?.message}
                        placeholder="0"
                        size="small"
                        inputProps={{ min: 0, max: 100 }}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="field-label">{t("categoryImgUrl")}</label>
                <Controller
                  name="image"
                  control={control}
                  rules={{
                    required: { value: true, message: t("foodImgReq") },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={Boolean(error)}
                      helperText={error?.message}
                      placeholder="https://..."
                      size="small"
                    />
                  )}
                />
              </div>

              {/* Actions */}
              <div className="dialog-actions">
                <Button
                  className="btn-cancel"
                  onClick={handleClose}
                  variant="outlined"
                >
                  {t("cancel")}
                </Button>
                <Button
                  className="btn-submit"
                  type="submit"
                  variant="contained"
                  startIcon={isEdit ? <EditOutlinedIcon /> : <AddIcon />}
                >
                  {isEdit ? t("update") : t("add")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </form>
      </StyleAddFood>
    </Dialog>
  );
}

export default AddFood;
