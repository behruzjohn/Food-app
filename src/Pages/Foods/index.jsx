import { StyleFoods } from "./StyleFoods";
import { useEffect, useState, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import AddFood from "../../Components/AddFood/index";
import FoodCard from "../../Components/FoodCard/FoodCards";
import OrderSearch from "../../Components/OrderSearch/index";
import { useMutation, useQuery } from "@apollo/client/react";
import GuardComponent from "../../Components/CheckRole/CheckRole";
import { Button, CircularProgress, Container, Pagination } from "@mui/material";
import HeaderDashborad from "../../Components/HeaderDashboard/index";
import DeleteFoodModalAlert from "../../Components/ConfrimDeleteAlert";
import SliderImages from "../../Components/Slider";
import FoodTable from "./components/FoodTable";
import { OrderTable } from "./components/FoodTable/StyleFoodTable";
import ToastCompact from "../../Components/Toast";
import { useNavigate } from "react-router-dom";
import {
  ADD_FOOD_FAVOURITES,
  ADD_FOODS,
  DELETE_FOOD,
  DELETE_FOOD_FROM_FAVOURITES,
  GET_ALL_FOODS,
  UPDATE_FOOD,
} from "./api";

const LIMIT = 12;

function Foods() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ── Auth ──
  const [role, setRole] = useState("");

  // ── UI state ──
  const [page, setPage] = useState(1);
  const [foods, setFoods] = useState([]);
  const [allFoodsForSearch, setAllFoodsForSearch] = useState([]);
  const [loadSearch, setLoadSearch] = useState(false);

  // ── Modal / action state ──
  const [open, setOpen] = useState(false);
  const [editedFoodId, setEditedFoodId] = useState(null);
  const [deletedFoodId, setDeletedFoodId] = useState(null);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // ── Toast state ──
  const [toastFav, setToastFav] = useState({
    open: false,
    status: "success",
    title: "",
  });
  const [toastFood, setToastFood] = useState({
    open: false,
    status: "success",
    title: "",
  });
  const [toastDelete, setToastDelete] = useState({
    open: false,
    status: "success",
    title: "",
  });
  const [toastUpdate, setToastUpdate] = useState({
    open: false,
    status: "success",
    title: "",
  });
  const [toastCart, setToastCart] = useState({
    open: false,
    status: "success",
    title: "",
  });

  // ── Queries ──
  const { data, loading, refetch } = useQuery(GET_ALL_FOODS, {
    variables: { page: 1, limit: LIMIT },
  });

  // ── Mutations ──
  const [addToFavourites] = useMutation(ADD_FOOD_FAVOURITES);
  const [removeFavourite] = useMutation(DELETE_FOOD_FROM_FAVOURITES);
  const [deleteFood] = useMutation(DELETE_FOOD);
  const [createFood] = useMutation(ADD_FOODS);
  const [updateFood] = useMutation(UPDATE_FOOD);

  // ── Helpers ──
  const refetchAndSet = useCallback(async () => {
    const { data } = await refetch({ page });
    if (data?.getAllFoods?.payload) {
      setFoods(data.getAllFoods.payload);
      setAllFoodsForSearch(data.getAllFoods.payload);
    }
  }, [page, refetch]);

  const showToast = (setter, status, title) =>
    setter({ open: true, status, title });

  // ── Effects ──
  useEffect(() => {
    const authStore = JSON.parse(localStorage.getItem("authStore") || "{}");
    if (!authStore?.state?.token) navigate("/sign-in");
    setRole(authStore?.state?.role || "");
  }, [navigate]);

  useEffect(() => {
    refetchAndSet();
  }, [page]);

  useEffect(() => {
    if (!isDeleted || !deletedFoodId) return;

    deleteFood({ variables: { foodId: deletedFoodId } })
      .then(() => {
        refetchAndSet();
        showToast(setToastDelete, "success", t("foodIsDeleted"));
      })
      .catch((err) => showToast(setToastDelete, "error", err.message))
      .finally(() => {
        setIsDeleted(false);
        setClickedDelete(false);
        setDeletedFoodId(null);
      });
  }, [isDeleted]);

  // ── Handlers ──
  const handleClickFavourite = (foodId) => {
    addToFavourites({
      variables: { foodId },
      onCompleted: () => {
        setFoods((prev) =>
          prev.map((f) => (f._id === foodId ? { ...f, isFavorite: true } : f)),
        );
        showToast(setToastFav, "success", t("addedToFavourite"));
      },
      onError: (err) => showToast(setToastFav, "error", err.message),
    });
  };

  const handleClickRemoveFav = (foodId) => {
    removeFavourite({
      variables: { foodId },
      onCompleted: () => {
        setFoods((prev) =>
          prev.map((f) => (f._id === foodId ? { ...f, isFavorite: false } : f)),
        );
      },
    });
  };

  const handleClickEditFood = (foodId) => {
    setEditedFoodId(foodId);
    setOpen(true);
  };

  const handleClickDeleteFood = (foodId) => {
    setDeletedFoodId(foodId);
    setClickedDelete(true);
  };

  const handleCloseFoodModal = () => {
    setOpen(false);
    setEditedFoodId(null);
  };

  const handleAddFood = async (formData) => {
    try {
      if (editedFoodId) {
        await updateFood({
          variables: {
            foodId: editedFoodId,
            food: {
              name: formData.name,
              shortName: formData.name.slice(0, 10),
              description: formData.description,
              price: Number(formData.price) || 0,
              discount: Number(formData.discount) || 0,
              category: formData.category,
            },
          },
        });
        showToast(setToastUpdate, "success", t("updatedFood"));
      } else {
        await createFood({
          variables: {
            food: {
              name: formData.name,
              shortName: formData.name.slice(0, 10),
              description: formData.description,
              price: Number(formData.price),
              discount: Number(formData.discount) || 0,
              category: formData.category,
            },
            image: formData.image,
          },
        });
        showToast(setToastFood, "success", t("addedNewFood"));
      }

      await refetchAndSet();
      setOpen(false);
      setEditedFoodId(null);
    } catch (err) {
      showToast(setToastFood, "error", err.message);
    }
  };

  // ── Render ──
  return (
    <HeaderDashborad>
      <StyleFoods className="foods">
        <Container maxWidth="xl" disableGutters>
          <OrderSearch
            setLoadSearch={setLoadSearch}
            loadSearch={loadSearch}
            refetchItem={refetch}
            setFoods={setFoods}
            allFoods={allFoodsForSearch}
            action="foods"
          />

          <SliderImages />

          {/* Header */}
          <div className="foods-header">
            <h2>{t("foodsName")}</h2>
            <div id="special">
              <GuardComponent role={role} section="newMenu" action="create">
                <Button
                  onClick={() => setOpen(true)}
                  color="success"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  <span className="addSpan">{t("newMenu")}</span>
                </Button>
              </GuardComponent>
            </div>
          </div>

          {/* Stats */}
          <div className="foods-stats">
            <div className="stat-pill">
              <span className="stat-dot" />
              {t("all")}: <strong>{foods.length}</strong> {t("product")}
            </div>
            <div className="stat-pill">
              <span className="stat-dot" />
              {t("data")}: <strong>{page}</strong> /{" "}
              <strong>{data?.getAllFoods?.totalPages || 1}</strong>
            </div>
          </div>

          {/* Content */}
          {loading || loadSearch ? (
            <div className="loading-wrap">
              <CircularProgress size={40} />
            </div>
          ) : (
            <div className="food-cards-nav">
              {role === "user" ? (
                foods.map((food) => (
                  <FoodCard
                    key={food._id}
                    food={food}
                    handleClickRemoveFav={handleClickRemoveFav}
                    handleClickEditFood={handleClickEditFood}
                    handleClickDeleteFood={handleClickDeleteFood}
                    handleClickFavourite={handleClickFavourite}
                    setOpenToastForAddCard={(v) =>
                      showToast(setToastCart, "success", t("addedNewCartFood"))
                    }
                  />
                ))
              ) : (
                <div className="table-card">
                  <OrderTable>
                    <div className="orders-list-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>{t("foodImgUrl")}</th>
                            <th>{t("foodName")}</th>
                            <th>{t("foodDescription")}</th>
                            <th>{t("categories")}</th>
                            <th>{t("price")}</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {foods.map((food) => (
                            <FoodTable
                              key={food._id}
                              food={food}
                              handleClickDeleteFood={handleClickDeleteFood}
                              handleClickEditFood={handleClickEditFood}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </OrderTable>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {!loading && (
            <div className="pagination-wrap">
              <Pagination
                page={page}
                onChange={(_, val) => setPage(val)}
                count={data?.getAllFoods?.totalPages}
                shape="rounded"
              />
            </div>
          )}
        </Container>
      </StyleFoods>

      {/* Modals */}
      <AddFood
        open={open}
        foods={foods}
        onAdd={handleAddFood}
        editedFoodId={editedFoodId}
        onClose={handleCloseFoodModal}
      />
      <DeleteFoodModalAlert
        open={clickedDelete}
        setOpen={setClickedDelete}
        setIsDeleted={setIsDeleted}
      />

      {/* Toasts */}
      <ToastCompact
        {...toastFav}
        setOpen={(v) => setToastFav((p) => ({ ...p, open: v }))}
      />
      <ToastCompact
        {...toastFood}
        setOpen={(v) => setToastFood((p) => ({ ...p, open: v }))}
      />
      <ToastCompact
        {...toastDelete}
        setOpen={(v) => setToastDelete((p) => ({ ...p, open: v }))}
      />
      <ToastCompact
        {...toastUpdate}
        setOpen={(v) => setToastUpdate((p) => ({ ...p, open: v }))}
      />
      <ToastCompact
        {...toastCart}
        setOpen={(v) => setToastCart((p) => ({ ...p, open: v }))}
      />
    </HeaderDashborad>
  );
}

export default Foods;
