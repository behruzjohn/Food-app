import { StyleFoods } from './StyleFoods';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import ToastExample from '../../Components/Toast';
import AddFood from '../../Components/AddFood/index';
import FoodQuontity from '../../Components/FoodQuontity';
import FoodCard from '../../Components/FoodCard/FoodCards';
import OrderSearch from '../../Components/OrderSearch/index';
import { useMutation, useQuery } from '@apollo/client/react';
import GuardComponent from '../../Components/CheckRole/CheckRole';
import { Button, CircularProgress, Container } from '@mui/material';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import DeleteFoodModalAlert from '../../Components/ConfrimDeleteAlert';
import {
  ADD_FOOD_FAVOURITES,
  ADD_FOODS,
  CREATE_CARD,
  DELETE_FOOD,
  DELETE_FOOD_FROM_FAVOURITES,
  GET_ALL_FOODS,
  UPDATE_FOOD,
} from './api';

function Foods() {
  const { t } = useTranslation();
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [foods, setFoods] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [quontityLen, setQuontityLen] = useState(0);
  const [loadSearch, setLoadSearch] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [editedFoodId, setEditedFoodId] = useState(null);
  const [openQuontity, setOpenQuontity] = useState(false);
  const [deletedFoodId, setDeletedFoodId] = useState(null);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [allFoodsForSearch, setAllFoodsForSearch] = useState([]);
  const [openToastForAddCard, setOpenToastForAddCard] = useState(false);
  const [openToastForDelete, setOpenToastForDeleteFood] = useState(false);
  const [openToastForUpdateFood, setOpenToastForUpdateFood] = useState(false);

  const [createCard] = useMutation(CREATE_CARD);
  const [addToFavourites, { data: favouriteData, error: favouriteError }] =
    useMutation(ADD_FOOD_FAVOURITES);
  const [deleteFoodById] = useMutation(DELETE_FOOD_FROM_FAVOURITES);
  const [deleteFood, { data: deleteFoodData, error: deleteFoodErr }] =
    useMutation(DELETE_FOOD);
  const [createFood, { data: AddFoodData, error: AddFoodErr }] =
    useMutation(ADD_FOODS);

  const updatedIsComplated = () => {
    setOpenToastForUpdateFood(true);
  };

  const [updateFood, { data: updateFoodData }] = useMutation(UPDATE_FOOD, {
    onCompleted: updatedIsComplated,
  });
  const { data, loading, refetch } = useQuery(GET_ALL_FOODS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    refetch();

    if (data?.getAllFoods?.payload) {
      setFoods(data?.getAllFoods?.payload);
      setAllFoodsForSearch(data?.getAllFoods?.payload);
    }
  }, [data]);

  useEffect(() => {
    const stored = localStorage.getItem('authStore');
    const a = JSON.parse(stored || '{}');
    setRole(a?.state?.role);
  }, []);

  const handleClickFavourite = (clickedFoodId) => {
    setOpenToast(true);
    addToFavourites({
      variables: {
        foodId: clickedFoodId,
      },
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  const handleClickRemoveFav = (clickedFoodId) => {
    deleteFoodById({ variables: { foodId: clickedFoodId } });
  };

  const handleAddToCart = (food) => {
    setOpenQuontity(false);
    setSelectedFood(food);
    setTimeout(() => setOpenQuontity(true), 0);
  };
  const handleConfirmQuontity = (quontity) => {
    createCard({
      variables: {
        data: {
          food: selectedFood,
          quantity: quontity,
        },
      },
    });
    setQuontityLen((prev) => prev + 1);

    setOpenQuontity(false);
    setSelectedFood(null);
    setOpenToastForAddCard(true);
  };

  const handleClickEditFood = (foodId) => {
    setEditedFoodId(foodId);
    setOpen(true);
  };

  const handleAddFood = async (formData) => {
    try {
      const token = localStorage.getItem('token') || '';

      if (editedFoodId) {
        const { ...rest } = formData;

        await updateFood({
          variables: {
            foodId: editedFoodId,
            food: {
              ...rest,
              price: formData.price ? Number(formData.price) : 0,
              discount: formData.discount ? Number(formData.discount) : 0,
            },
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });

        refetch();

        setOpen(false);
        setEditedFoodId(null);
        setOpenToast(true);
        return;
      }

      await createFood({
        variables: {
          food: {
            name: formData.name,
            shortName: formData.name.slice(0, 10),
            description: formData.description,
            price: Number(formData.price),
            discount: formData.discount ? Number(formData.discount) : 0,
            category: formData.category,
          },
          image: formData.image,
        },
      });

      setOpen(false);
      refetch();
      setOpenToast(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickDeleteFood = (foodId) => {
    setDeletedFoodId(foodId);
    setClickedDelete(true);
  };

  useEffect(() => {
    if (isDeleted && deletedFoodId) {
      deleteFood({ variables: { foodId: deletedFoodId } })
        .then(() => refetch())
        .finally(() => {
          setIsDeleted(false);
          setClickedDelete(false);
          setDeletedFoodId(null);
        });
      setOpenToastForDeleteFood(true);
    }
  }, [isDeleted]);

  return (
    <HeaderDashborad>
      <StyleFoods className="foods">
        <Container maxWidth="xl">
          <OrderSearch
            setLoadSearch={setLoadSearch}
            loadSearch={loadSearch}
            quontityLen={quontityLen}
            refetchItem={refetch}
            setFoods={setFoods}
            allFoods={allFoodsForSearch}
            action="foods"
          />
          <div className="foods-header">
            <div>
              <h2>{t('foodsName')}</h2>
              <p>{t('foodsDescription')}</p>
            </div>
            <div id="special">
              <GuardComponent role={role} section="newMenu" action="create">
                <Button
                  onClick={() => setOpen(true)}
                  color="success"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  {t('newMenu')}
                </Button>
              </GuardComponent>
            </div>
          </div>
          <div className="food-cards">
            {loading || loadSearch ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: 20,
                  marginTop: 150,
                }}
              >
                <CircularProgress style={{ marginTop: 40 }} size={50} />
              </div>
            ) : (
              <div className="food-cards-nav">
                {foods?.map((food) => (
                  <FoodCard
                    handleClickRemoveFav={handleClickRemoveFav}
                    handleClickEditFood={handleClickEditFood}
                    handleClickDeleteFood={handleClickDeleteFood}
                    handleClickFavourite={handleClickFavourite}
                    handleAddToCart={handleAddToCart}
                    key={food._id}
                    food={food}
                  />
                ))}
              </div>
            )}
          </div>
        </Container>
      </StyleFoods>
      <ToastExample
        status={favouriteError || AddFoodErr ? 'error' : 'success'}
        title={
          favouriteError?.errors?.[0]?.message ||
          AddFoodErr?.errors?.[0]?.message ||
          (AddFoodData?.createFood?.payload ? t('addedNewFood') : '') ||
          (favouriteData?.addFoodToFavorites?.payload
            ? t('addedToFavourite')
            : '')
        }
        open={openToast}
        setOpen={setOpenToast}
      />

      <AddFood
        foods={foods}
        editedFoodId={editedFoodId}
        open={open}
        setOpen={setOpen}
        onAdd={handleAddFood}
      />
      <DeleteFoodModalAlert
        open={clickedDelete}
        setOpen={setClickedDelete}
        setIsDeleted={setIsDeleted}
      />
      <FoodQuontity
        onConfirm={handleConfirmQuontity}
        open={openQuontity}
        setOpen={setOpenQuontity}
      ></FoodQuontity>
      <ToastExample
        status="success"
        title={t('addedNewCartFood')}
        open={openToastForAddCard}
        setOpen={setOpenToastForAddCard}
      ></ToastExample>
      <ToastExample
        status={updateFoodData?.updateFoodById?.payload ? 'success' : 'error'}
        title={updateFoodData?.updateFoodById?.payload ? t('updatedFood') : ''}
        open={openToastForUpdateFood}
        setOpen={setOpenToastForUpdateFood}
      ></ToastExample>
      <ToastExample
        status={deleteFoodData?.deleteFoodById?.payload ? 'success' : 'error'}
        title={
          deleteFoodErr?.message ? deleteFoodErr?.message : t('foodIsDeleted')
        }
        open={openToastForDelete}
        setOpen={setOpenToastForDeleteFood}
      />
    </HeaderDashborad>
  );
}

export default Foods;
