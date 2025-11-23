import { Button, CircularProgress, Container } from '@mui/material';
import OrderSearch from '../../Components/OrderSearch/index';
import { StyleFoods } from './StyleFoods';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FoodCard from '../../Components/FoodCard/FoodCards';
import AddFood from '../../Components/AddFood/index';
import { useEffect, useRef, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useMutation, useQuery } from '@apollo/client/react';
import Loader from '../../Components/Loader/index';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import ToastExample from '../../Components/Toast';
import DeleteFoodModalAlert from '../../Components/ConfrimDeleteAlert';
import GuardComponent from '../../Components/CheckRole/CheckRole';
import FoodQuontity from '../../Components/FoodQuontity';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
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

  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [foods, setFoods] = useState([]);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [deletedFoodId, setDeletedFoodId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [role, setRole] = useState('');
  const [openQuontity, setOpenQuontity] = useState(false);
  const [openToastForAddCard, setOpenToastForAddCard] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [editedFoodId, setEditedFoodId] = useState(null);
  const [openToastForUpdateFood, setOpenToastForUpdateFood] = useState(false);
  const [createCard, { data: createCardData }] = useMutation(CREATE_CARD);
  const [addToFavourites, { data: favouriteData, error: favouriteError }] =
    useMutation(ADD_FOOD_FAVOURITES);
  const [allFoodsForSearch, setAllFoodsForSearch] = useState([]);
  const [deleteFoodById, { data: deleteFavData, error: deleteFoodError }] =
    useMutation(DELETE_FOOD_FROM_FAVOURITES);

  const updatedIsComplated = () => {
    setOpenToastForUpdateFood(true);
  };

  const [
    deleteFood,
    {
      data: deleteFoodData,
      loadingdeleteFoodData: deleteFoodLoading,
      refetch: deleteFoodRef,
    },
  ] = useMutation(DELETE_FOOD);

  const [createFood, { data: AddFoodData, error: AddFoodErr }] =
    useMutation(ADD_FOODS);
  const [updateFood, { data: updateFoodData, error: updateFoodErr }] =
    useMutation(UPDATE_FOOD, { onCompleted: updatedIsComplated });
  const [quontityLen, setQuontityLen] = useState(0);

  const { data, loading, error, refetch } = useQuery(GET_ALL_FOODS);
  useEffect(() => {
    refetch();

    if (data?.getAllFoods?.payload) {
      setFoods(data?.getAllFoods?.payload);
      setAllFoodsForSearch(data?.getAllFoods?.payload);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('authStore') || '');
    setRole(a?.state?.role);
  }, []);

  const handleClickFavourite = (clickedFoodId) => {
    const localToken = JSON.parse(localStorage.getItem('authStore') || '');
    const token = localToken?.state?.token;

    setOpenToast(true);
    addToFavourites({
      variables: {
        foodId: clickedFoodId,
      },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });

    console.log(favouriteError?.errors[0]?.message);
  };

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
    console.log(createCardData);
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
      setLoad(true);
      const token = localStorage.getItem('token') || '';

      if (editedFoodId) {
        const { image, ...rest } = formData;

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
        setLoad(false);
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
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

      setOpen(false);
      setOpenToast(true);
      setLoad(false);
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
    }
  }, [isDeleted]);

  // useEffect(() => {
  //   if (open) {
  //     if (editedFoodId) {
  //       const food = foods.find((f) => f._id === editedFoodId);
  //       if (!food) return;
  //       reset({
  //         name: food?.name || '',
  //         shortName: food?.shortName || '',
  //         description: food?.description || '',
  //         price: food?.price || '',
  //         discount: food?.discount || '',
  //         category: food?.category || '',
  //         image: null,
  //       });
  //     } else {
  //       reset({
  //         name: '',
  //         shortName: '',
  //         description: '',
  //         price: '',
  //         discount: '',
  //         category: '',
  //         image: null,
  //       });
  //     }
  //   }
  // }, [open, editedFoodId, foods]);

  return (
    <HeaderDashborad>
      <StyleFoods className="foods">
        <Container maxWidth="xl">
          <OrderSearch
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
            {loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: 20,
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
          (favouriteData?.addToFavourite?.payload ? t('addedToFavourite') : '')
        }
        open={openToast}
        setOpen={setOpenToast}
      />

      <AddFood
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
    </HeaderDashborad>
  );
}

export default Foods;
