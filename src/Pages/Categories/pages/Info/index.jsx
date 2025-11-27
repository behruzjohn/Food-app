import {
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client/react/compiled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FoodCard from '../../../../Components/FoodCard/FoodCards';
import { Button, Container } from '@mui/material';
import HeaderDashborad from '../../../../Components/HeaderDashboard/index';
import AddIcon from '@mui/icons-material/Add';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import undefindImg from '../../../../assets/noFound.png';
import { useTranslation } from 'react-i18next';

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import GuardComponent from '../../../../Components/CheckRole/CheckRole';
import { StyleCategoryInfo } from './StyleCategoryInfo';
import FoodQuontity from '../../../../Components/FoodQuontity';
import ToastExample from '../../../../Components/Toast';
import { ADD_FOODS, DELETE_FOOD, UPDATE_FOOD } from '../../../Foods/api';
import AddFood from '../../../../Components/AddFood';
import DeleteFoodModalAlert from '../../../../Components/ConfrimDeleteAlert';
import {
  CREATE_CARD,
  GET_CATEOGRY_BY_ID,
  GET_FOODS_BY_CATEGORY,
} from '../../api';

function CategoryInfo() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate('');
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [categoryCard, setCategoryCard] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [editedFoodId, setEditedFoodId] = useState(null);
  const [openQuontity, setOpenQuontity] = useState(false);
  const [deletedFoodId, setDeletedFoodId] = useState(null);
  const [openForUpdate, setOpenForUptade] = useState(false);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [openToastForAddCard, setOpenToastForAddCard] = useState(false);
  const localToken = JSON.parse(localStorage.getItem('authStore') || '');
  const [openToastForDelete, setOpenToastForDeleteFood] = useState(false);
  const [openToastForUpdateFood, setOpenToastForUpdateFood] = useState(false);

  const token = localToken?.state?.token;
  const [createFood, { data: AddFoodData, error: AddFoodErr }] =
    useMutation(ADD_FOODS);
  const updatedIsComplated = () => {
    setOpenToastForUpdateFood(true);
  };

  const [updateFood, { data: updateFoodData }] = useMutation(UPDATE_FOOD, {
    onCompleted: updatedIsComplated,
  });
  const [deleteFood, { data: deleteFoodData, error: deleteFoodErr }] =
    useMutation(DELETE_FOOD);
  const [fetchCategoryById, { data, refetch }] = useLazyQuery(
    GET_FOODS_BY_CATEGORY,
    { fetchPolicy: 'network-only' }
  );
  const [createCard] = useMutation(CREATE_CARD);
  const {
    data: dataTitle,
    loading: LoadTitle,
    refetch: refetchCategoryTitle,
  } = useQuery(GET_CATEOGRY_BY_ID, {
    variables: {
      categoryId: id,
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const handleAddToCart = (food) => {
    setSelectedFood(food);
    setOpenQuontity(true);
  };

  const handleClickDeleteFood = (foodId) => {
    setDeletedFoodId(foodId);
    setClickedDelete(true);
  };

  const handleClickEditFood = (foodId) => {
    setEditedFoodId(foodId);
    setOpenForUptade(true);
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
        refetchCategoryTitle();
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
      refetch();

      setOpen(false);
      setOpenToast(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('authStore');
    const a = JSON.parse(stored || '{}');
    setRole(a?.state?.role);
  }, []);

  useEffect(() => {
    if (id) {
      fetchCategoryById({
        variables: { categories: [id] },
      });
    }
  }, [id]);

  useEffect(() => {
    if (data?.getAllFoods?.payload) {
      setCategoryCard(data.getAllFoods.payload);
    }
  }, [data]);

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
                  handleClickEditFood={handleClickEditFood}
                  handleClickDeleteFood={handleClickDeleteFood}
                />
              ))
            ) : (
              <div style={{ marginTop: 15 }} className="error">
                <div className="img-with">
                  <img id="undefind" src={undefindImg} alt="Undefined Image" />
                  {categoryCard.length > 0 ? (
                    <></>
                  ) : (
                    <GuardComponent
                      role={role}
                      section="addFood"
                      action="addFood"
                    >
                      <Button
                        onClick={() => setOpen(true)}
                        color="success"
                        startIcon={<AddIcon />}
                        variant="contained"
                      >
                        {t('createFood')}
                      </Button>
                    </GuardComponent>
                  )}
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
        <AddFood open={open} setOpen={setOpen} onAdd={handleAddFood} />
        <ToastExample
          status={AddFoodErr ? 'error' : 'success'}
          title={
            AddFoodErr?.errors?.[0]?.message ||
            (AddFoodData?.createFood?.payload ? t('addedNewFood') : '')
          }
          open={openToast}
          setOpen={setOpenToast}
        />
        <AddFood
          editedFoodId={editedFoodId}
          open={openForUpdate}
          setOpen={setOpenForUptade}
          onAdd={handleAddFood}
        />
        <DeleteFoodModalAlert
          open={clickedDelete}
          setOpen={setClickedDelete}
          setIsDeleted={setIsDeleted}
        />
        <ToastExample
          status={updateFoodData?.updateFoodById?.payload ? 'success' : 'error'}
          title={
            updateFoodData?.updateFoodById?.payload ? t('updatedFood') : ''
          }
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
      </Container>
    </HeaderDashborad>
  );
}

export default CategoryInfo;
