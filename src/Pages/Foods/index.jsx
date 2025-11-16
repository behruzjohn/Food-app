import { Button, Container } from '@mui/material';
import OrderSearch from '../../Components/OrderSearch/index';
import { StyleFoods } from './StyleFoods';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FoodCard from '../../Components/FoodCard/FoodCards';
import AddFood from '../../Components/AddFood/index';
import { useEffect, useRef, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import Loader from '../../Components/Loader/index';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import ToastExample from '../../Components/Toast';
import DeleteFoodModalAlert from '../../Components/ConfrimDeleteAlert';
import GuardComponent from '../../Components/CheckRole/CheckRole';
import FoodQuontity from '../../Components/FoodQuontity';
import { useTranslation } from 'react-i18next';
const GET_ALL_FOODS = gql`
  query GetAllFoods {
    getAllFoods {
      totalDocs
      limit
      totalPages
      page
      pagingCounter
      hasPrevPage
      hasNextPage
      prevPage
      nextPage
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
        category {
          _id
          name
          image
        }
      }
    }
  }
`;
const ADD_FOODS = gql`
  mutation CreateFood($food: FoodInput!, $image: Upload!) {
    createFood(image: $image, food: $food) {
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
        category {
          _id
          name
          image
        }
      }
    }
  }
`;
const ADD_FOOD_FAVOURITES = gql`
  mutation AddFoodToFavorites($foodId: ID!) {
    addFoodToFavorites(foodId: $foodId) {
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
const DELETE_FOOD = gql`
  mutation AddFoodToFavorites($foodId: ID!) {
    deleteFoodById(foodId: $foodId) {
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
const CREATE_CARD = gql`
  mutation CreateCartItem($data: CartItemInput!) {
    createCartItem(data: $data) {
      payload {
        _id
        quantity
        price
        discount
        user
        food {
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
  }
`;
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
  const [createCard, { data: createCardData }] = useMutation(CREATE_CARD);
  const [addToFavourites, { data: favouriteData, error: favouriteError }] =
    useMutation(ADD_FOOD_FAVOURITES);
  const [allFoodsForSearch, setAllFoodsForSearch] = useState([]);
  const [
    deleteFood,
    {
      data: deleteFoodData,
      loadingdeleteFoodData: deleteFoodLoading,
      refetch: deleteFoodRef,
    },
  ] = useMutation(DELETE_FOOD);

  const [createFood] = useMutation(ADD_FOODS);
  const { data, loading, error, refetch } = useQuery(GET_ALL_FOODS);
  useEffect(() => {
    refetch();
    setLoad(true);
    if (data?.getAllFoods?.payload) {
      setFoods(data?.getAllFoods?.payload);
      setAllFoodsForSearch(data?.getAllFoods?.payload);
      setLoad(false);
    }
  }, [data]);
  useEffect(() => {
    setLoad(true);
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
      await createFood({
        variables: {
          food: {
            name: formData.name,
            shortName: formData.shortName,
            description: formData.description,
            price: Number(formData.price),
            discount: Number(formData.discount),
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
      if (data?.createFood?.payload) {
        setLoad(false);
      }
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

  return (
    <HeaderDashborad>
      <Loader load={loading}></Loader>
      <StyleFoods className="foods">
        <Container maxWidth="xl">
          <OrderSearch
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <GuardComponent role={role} section="newMenu" action="create">
                <Button
                  onClick={() => setOpen(true)}
                  color="success"
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                >
                  {t('newMenu')}
                </Button>
              </GuardComponent>
            </div>
          </div>
          <div className="food-cards">
            <div className="food-cards-nav">
              {foods?.map((food) => (
                <FoodCard
                  handleClickEditFood={handleClickEditFood}
                  handleClickDeleteFood={handleClickDeleteFood}
                  handleClickFavourite={handleClickFavourite}
                  handleAddToCart={handleAddToCart}
                  key={food._id}
                  food={food}
                />
              ))}
            </div>
          </div>
        </Container>
      </StyleFoods>
      <ToastExample
        status={favouriteError?.errors?.length ? 'error' : 'success'}
        title={
          favouriteError?.errors?.length
            ? favouriteError?.errors[0]?.message
            : t('addedNewFood')
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
    </HeaderDashborad>
  );
}

export default Foods;
