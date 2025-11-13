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
      const token = localStorage.getItem('token') || '';
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
      <Container maxWidth="lg">
        <div className="categories">
          <div className="categories-nav">
            <OrderSearch></OrderSearch>
            <div style={{ marginTop: 30 }} className="category-nav">
              <header
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h2>Category Page</h2>
                  <p>Find Categoires for you</p>
                </div>
                <Button
                  onClick={() => setOpenCategories(true)}
                  color="success"
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Add Categories
                </Button>
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
      <AddCatagories
        open={openCategories}
        setOpen={setOpenCategories}
        onAdd={handleAddCategory}
      />
      <ToastExample
        title={"Muvofoqiyatli o'chirildi!"}
        open={openToastDelete}
        setOpen={setOpenToastDelete}
      ></ToastExample>
      <ToastExample
        title={"Categorya muvofoqiyatli qo'shildi!"}
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
