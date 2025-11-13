import { Button, Container } from '@mui/material';
import OrderSearch from '../../Components/OrderSearch/index';
import { StyleFoods } from './StyleFoods';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FoodCard from '../../Components/FoodCard/FoodCards';
import AddFood from '../../Components/AddFood/index';
import { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import Loader from '../../Components/Loader/index';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import ToastExample from '../../Components/Toast';
import DeleteFoodModalAlert from '../../Components/ConfrimDeleteAlert';
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
function Foods() {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [foods, setFoods] = useState([]);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [deletedFoodId, setDeletedFoodId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [addToFavourites] = useMutation(ADD_FOOD_FAVOURITES);
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
      setLoad(false);
    }
  }, [data]);

  const handleClickAddToCard = (clickedFoodId) => {
    const token = localStorage.getItem('token') || '';
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
      <Loader load={load}></Loader>
      <StyleFoods className="foods">
        <Container maxWidth="lg">
          <OrderSearch />
          <div className="foods-header">
            <div>
              <h2>Foods</h2>
              <p>Here is your menu summary with graph view</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <Button
                onClick={() => setOpen(true)}
                color="success"
                variant="contained"
                startIcon={<PersonAddIcon />}
              >
                New Menu
              </Button>
            </div>
          </div>
          <div className="food-cards">
            <div className="food-cards-nav">
              {foods.map((food) => (
                <FoodCard
                  handleClickDeleteFood={handleClickDeleteFood}
                  handleClickAddToCard={handleClickAddToCard}
                  key={food._id}
                  food={food}
                />
              ))}
            </div>
          </div>
        </Container>
      </StyleFoods>
      <ToastExample
        title="Yangi Food qo'shildi!"
        open={openToast}
        setOpen={setOpenToast}
      />
      <AddFood open={open} setOpen={setOpen} onAdd={handleAddFood} />
      <DeleteFoodModalAlert
        open={clickedDelete}
        setOpen={setClickedDelete}
        setIsDeleted={setIsDeleted}
      />
    </HeaderDashborad>
  );
}

export default Foods;
