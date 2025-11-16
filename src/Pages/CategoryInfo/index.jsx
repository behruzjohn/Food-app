import { gql } from '@apollo/client';
import { useLazyQuery, useQuery } from '@apollo/client/react/compiled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FoodCard from '../../Components/FoodCard/FoodCards';
import { Button, Container } from '@mui/material';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddIcon from '@mui/icons-material/Add';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';

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
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import GuardComponent from '../../Components/CheckRole/CheckRole';

function CategoryInfo() {
  const location = useLocation();
  const localToken = JSON.parse(localStorage.getItem('authStore') || '');
  const token = localToken?.state?.token;
  const [categoryCard, setCategoryCard] = useState([]);
  const params = new URLSearchParams(location.search);
  const categoryId = params.get('id');
  const navigate = useNavigate('');
  const [role, setRole] = useState('');

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

  return (
    <HeaderDashborad>
      <Container maxWidth="xl">
        <div
          style={{
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={() => navigate('/categories')}
            variant="outlined"
            startIcon={<ArrowBackIosNewOutlinedIcon />}
          >
            Goo back
          </Button>
          {categoryCard.length > 0 ? (
            <></>
          ) : (
            <GuardComponent role={role} section="addFood" action="addFood">
              <Button
                color="success"
                startIcon={<AddIcon />}
                variant="outlined"
              >
                Create Food
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
              <FoodCard key={category._id} isSpeacial={true} food={category} />
            ))
          ) : (
            <div style={{ marginTop: 15 }} className="error">
              <h1
                style={{
                  color: 'red',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                Bu Categoryada umuman Ovqat yoq
                <ErrorOutlineIcon fontSize="large" />
              </h1>
            </div>
          )}
        </div>
      </Container>
    </HeaderDashborad>
  );
}

export default CategoryInfo;
