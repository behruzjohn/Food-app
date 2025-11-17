import { gql } from '@apollo/client';
import {
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client/react/compiled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FoodCard from '../../Components/FoodCard/FoodCards';
import { Button, Container } from '@mui/material';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddIcon from '@mui/icons-material/Add';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import undefindImg from '../../assets/noFound.png';
import { useTranslation } from 'react-i18next';

const GET_FOODS_BY_CATEGORY = gql`
  query GetAllFoods($categories: [ID]) {
    getAllFoods(categories: $categories) {
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
      }
    }
  }
`;
const GET_CATEOGRY_BY_ID = gql`
  query GetCategoryById($categoryId: ID!) {
    getCategoryById(categoryId: $categoryId) {
      payload {
        _id
        name
        image
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
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import GuardComponent from '../../Components/CheckRole/CheckRole';
import { StyleCategoryInfo } from './StyleCategoryInfo';
import FoodQuontity from '../../Components/FoodQuontity';
import ToastExample from '../../Components/Toast';
import { StyleCategoryInfoo } from './StyleInfo';

function CategoryInfo() {
  const { t } = useTranslation();
  const location = useLocation();
  const localToken = JSON.parse(localStorage.getItem('authStore') || '');
  const token = localToken?.state?.token;
  const [categoryCard, setCategoryCard] = useState([]);
  const params = new URLSearchParams(location.search);
  const categoryId = params.get('id');
  const navigate = useNavigate('');
  const [role, setRole] = useState('');
  const [openToastForAddCard, setOpenToastForAddCard] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [openQuontity, setOpenQuontity] = useState(false);

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('authStore') || '');
    console.log(a?.state?.role);

    setRole(a?.state?.role);
  }, []);

  const { data: dataTitle, loading: LoadTitle } = useQuery(GET_CATEOGRY_BY_ID, {
    variables: {
      categoryId: categoryId,
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const [fetchCategoryById, { data, loading, error }] = useLazyQuery(
    GET_FOODS_BY_CATEGORY
  );
  const [createCard, { data: createCardData }] = useMutation(CREATE_CARD);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get('id');
    const token = localStorage.getItem('token') || '';

    if (categoryId) {
      console.log('Request yuborildi id:', categoryId);
      fetchCategoryById({
        variables: { categories: [categoryId] },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
    }
  }, [location.search]);

  useEffect(() => {
    if (data?.getAllFoods?.payload) {
      setCategoryCard(data.getAllFoods.payload);
    }
  }, [data]);

  const handleAddToCart = (food) => {
    setSelectedFood(food);
    setOpenQuontity(true);
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

  return (
    <HeaderDashborad>
      <Container maxWidth="xl">
        <StyleCategoryInfo>
          <div className="continer">
            <Button
              onClick={() => navigate('/categories')}
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
            >
              {t('gooBack')}
            </Button>
            {categoryCard.length > 0 ? (
              <></>
            ) : (
              <GuardComponent role={role} section="addFood" action="addFood">
                <Button
                  onClick={() => navigate('/foods')}
                  color="success"
                  startIcon={<AddIcon />}
                  variant="outlined"
                >
                  {t('createFood')}
                </Button>
              </GuardComponent>
            )}
          </div>
          <h2>
            <strong>{' ' + dataTitle?.getCategoryById?.payload?.name}</strong>{' '}
            <FastfoodOutlinedIcon />
          </h2>
          <div
            style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}
            className="card"
          >
            {categoryCard.length > 0 ? (
              categoryCard.map((category) => (
                <FoodCard
                  handleAddToCart={handleAddToCart}
                  key={category._id}
                  isSpeacial={true}
                  food={category}
                />
              ))
            ) : (
              <div style={{ marginTop: 15 }} className="error">
                <div className="img-with">
                  <img id="undefind" src={undefindImg} alt="Undefined Image" />
                </div>
              </div>
            )}
          </div>
          <ToastExample
            status="success"
            title={t('addedNewCartFood')}
            open={openToastForAddCard}
            setOpen={setOpenToastForAddCard}
          ></ToastExample>
          <FoodQuontity
            onConfirm={handleConfirmQuontity}
            open={openQuontity}
            setOpen={setOpenQuontity}
          ></FoodQuontity>
        </StyleCategoryInfo>
      </Container>
    </HeaderDashborad>
  );
}

export default CategoryInfo;
