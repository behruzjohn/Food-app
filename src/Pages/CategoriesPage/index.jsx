import { Button, Container } from '@mui/material';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import OrderSearch from '../../Components/OrderSearch/index';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCatagories from '../../Components/AddCatagories/index';
import ToastExample from '../../Components/Toast';
import CategoryCard from '../../Components/CategegoryCard/CategoryCard';
import DeleteFoodModalAlert from '../../Components/ConfrimDeleteAlert';
import CheckToken from '../../Components/CheckToken';
import GuardComponent from '../../Components/CheckRole/CheckRole';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { StyleCategory } from './StyleCategory';
const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      payload {
        _id
        name
        image
      }
    }
  }
`;

const CREATE_CATEGORIES = gql`
  mutation CreateCategory($name: String!, $image: String!) {
    createCategory(category: { name: $name, image: $image }) {
      payload {
        _id
        name
        image
      }
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation DeleteCategoryById2($categoryId: ID!) {
    deleteCategoryById(categoryId: $categoryId) {
      payload {
        _id
        name
        image
      }
    }
  }
`;

function CategoriesPage() {
  const [createCategory] = useMutation(CREATE_CATEGORIES);
  const [categoires, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState(false);
  const [deletedCategoryId, setDeletedCategoryId] = useState('');
  const [openToastDelete, setOpenToastDelete] = useState(false);
  const [openToastC, setOpenToastC] = useState(false);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('authStore') || '');
    console.log(a?.state?.role);

    setRole(a?.state?.role);
  }, []);

  CheckToken();

  const [fetchAllCategoires, { data, loading, error, refetch }] =
    useLazyQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    if (data?.getAllCategories?.payload) {
      setCategories(data.getAllCategories.payload);
    }
  }, [data]);

  useEffect(() => {
    fetchAllCategoires();
  }, [data]);

  useEffect(() => {
    refetch();
  }, [openCategories]);

  const handleAddCategory = async (formData) => {
    try {
      setClickedDelete(false);
      setOpenToastC(true);
      const localToken = JSON.parse(localStorage.getItem('authStore') || '');
      const token = localToken?.state?.token;
      await createCategory({
        variables: {
          name: formData.name,
          image: formData.image,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [
    deleteCategory,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_CATEGORY);

  useEffect(() => {
    const handleDeleteCategory = async () => {
      if (isDeleted && deletedCategoryId) {
        setOpenToastDelete(true);
        try {
          const token = localStorage.getItem('token') || '';
          await deleteCategory({
            variables: { categoryId: deletedCategoryId },
            context: {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          });
          refetch();
          setDeletedCategoryId(null);
          setIsDeleted(false);
        } catch (err) {
          console.error(err);
        }
      }
    };

    handleDeleteCategory();
  }, [isDeleted, deleteCategory, refetch]);
  return (
    <HeaderDashborad>
      <StyleCategory>
        <Container maxWidth="xl">
          <div className="categories">
            <div className="categories-nav">
              <OrderSearch action="category"></OrderSearch>
              <div className="category-nav">
                <header>
                  <div>
                    <h2>{t('categoryPg')}</h2>
                    <p>{t('categoryDescription')}</p>
                  </div>
                  <GuardComponent
                    role={role}
                    section="category"
                    action="addCategory"
                  >
                    <Button
                      style={{ height: 38 }}
                      onClick={() => setOpenCategories(true)}
                      color="success"
                      variant="contained"
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      {t('addCategory')}
                    </Button>
                  </GuardComponent>
                </header>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}
                  className="card"
                >
                  {categoires?.map((category) => {
                    return (
                      <CategoryCard
                        setClickedDelete={setClickedDelete}
                        setOpenToast={setOpenToastDelete}
                        category={category}
                        setDeletedCategoryId={setDeletedCategoryId}
                      ></CategoryCard>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </StyleCategory>
      <AddCatagories
        open={openCategories}
        setOpen={setOpenCategories}
        onAdd={handleAddCategory}
      />
      <ToastExample
        title={t('categoryIsDeleted')}
        open={openToastDelete}
        setOpen={setOpenToastDelete}
      ></ToastExample>
      <ToastExample
        title={t('categoryAddSuccessfull')}
        open={openToastC}
        setOpen={setOpenToastC}
      ></ToastExample>
      <DeleteFoodModalAlert
        setIsDeleted={setIsDeleted}
        open={clickedDelete}
        setOpen={setClickedDelete}
      />
    </HeaderDashborad>
  );
}
export default CategoriesPage;
