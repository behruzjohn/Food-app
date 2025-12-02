import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import ToastExample from '../../Components/Toast';
import NoCategory from '../../assets/no category.png';
import CheckToken from '../../Components/CheckToken';
import { StyleCategories } from './Categories.style';
import OrderSearch from '../../Components/OrderSearch/index';
import AddCatagories from '../../Components/AddCatagories/index';
import GuardComponent from '../../Components/CheckRole/CheckRole';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import DeleteFoodModalAlert from '../../Components/ConfrimDeleteAlert';
import CategoryCard from '../../Components/CategegoryCard/CategoryCard';
import {
  GET_ALL_CATEGORIES,
  CREATE_CATEGORIES,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEOGRY_BY_ID,
} from './api';

function CategoriesPage() {
  const [role, setRole] = useState('');
  const [openToastC, setOpenToastC] = useState(false);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [openToastDelete, setOpenToastDelete] = useState(false);
  const [deletedCategoryId, setDeletedCategoryId] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState([]);

  const [createCategory] = useMutation(CREATE_CATEGORIES);
  const [getCategoryById, { data: getCategory }] =
    useLazyQuery(GET_CATEOGRY_BY_ID);
  const { data, refetch } = useQuery(GET_ALL_CATEGORIES);

  const handleDeleteCompleted = () => {
    refetch();
    setDeletedCategoryId(null);
    setIsDeleteModalOpen(false);
  };

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: handleDeleteCompleted,
  });

  const [editCategory, { data: editCategoryData }] = useMutation(EDIT_CATEGORY);

  const handleAddCategory = async (formData) => {
    try {
      if (editedCategory?.length) {
        await editCategory({
          variables: {
            categoryId: editCategoryId,
            category: {
              name: formData.name,
              image: formData.image,
            },
          },
        });

        refetch();
        setEditedCategory(null);
        setClickedDelete(false);
        setOpenToastC(true);
      } else {
        await createCategory({
          variables: {
            name: formData.name,
            image: formData.image,
          },
        });

        refetch();
        setClickedDelete(false);
        setOpenToastC(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickEdit = (clickedCategoryId) => {
    setEditCategoryId(clickedCategoryId);
    getCategoryById({ variables: { categoryId: clickedCategoryId } });
    if (getCategory?.getCategoryById?.payload) {
      setEditedCategory(getCategory?.getCategoryById?.payload);
      setOpenCategories(true);
    }
  };

  const handleDeleteCategory = () => {
    if (isDeleteModalOpen && deletedCategoryId) {
      setOpenToastDelete(true);
      deleteCategory({
        variables: { categoryId: deletedCategoryId },
      });
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('authStore');
    const a = JSON.parse(stored || '{}');
    setRole(a?.state?.role);
  }, []);

  CheckToken();

  useEffect(() => {
    handleDeleteCategory();
  }, [isDeleteModalOpen]);

  const categories = data?.getAllCategories?.payload || [];

  return (
    <HeaderDashborad>
      <StyleCategories>
        <Container maxWidth="xl">
          <div className="categories">
            <div className="categories-nav">
              <OrderSearch action="category"></OrderSearch>
              <div className="category-nav">
                <header>
                  <div>
                    <h2>{t('categoryPg')}</h2>
                  </div>
                  <GuardComponent
                    role={role}
                    section="category"
                    action="addCategory"
                  >
                    <Button
                      style={{ height: 36 }}
                      onClick={() => setOpenCategories(true)}
                      color="success"
                      variant="contained"
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      {t('addCategory')}
                    </Button>
                  </GuardComponent>
                </header>

                <div className="card">
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <CategoryCard
                      
                        handleClickEdit={handleClickEdit}
                        key={category.id}
                        setClickedDelete={setClickedDelete}
                        setOpenToast={setOpenToastDelete}
                        category={category}
                        setDeletedCategoryId={setDeletedCategoryId}
                      />
                    ))
                  ) : (
                    <div className="defualtImage">
                      <img src={NoCategory} alt="No Category" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </StyleCategories>
      <AddCatagories
        editedCategory={editedCategory}
        setEditedCategory={setEditedCategory}
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
        title={
          editCategoryData ? t('categoryEdited') : t('categoryAddSuccessfull')
        }
        open={openToastC}
        setOpen={setOpenToastC}
      ></ToastExample>
      <DeleteFoodModalAlert
        open={clickedDelete}
        setOpen={setClickedDelete}
        setIsDeleted={setIsDeleteModalOpen}
      />
    </HeaderDashborad>
  );
}
export default CategoriesPage;
