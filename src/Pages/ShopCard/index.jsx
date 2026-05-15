import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import AddOrder from "../../Components/AddOrder";
import Loader from "../../Components/Loader";
import OrderSearch from "../../Components/OrderSearch";
import ConfirmOrder from "../../Components/OrderConfirm";
import DeleteFoodModalAlert from "../../Components/ConfrimDeleteAlert";
import ToastExample from "../../Components/Toast";
import FavouriteCard from "../FavouritePage/pages/FavouriteCard";
import HeaderDashborad from "../../Components/HeaderDashboard";
import { CREATE_ORDER, DELETE_CART_ITEM, GET_CARD_FOOD } from "./api";
import undefindImg from "../../assets/nocart.png";
import {
  CartList,
  ContentGrid,
  EmptyState,
  NavBtn,
  OrderPanel,
  PageHeader,
  PageWrapper,
  SummaryCard,
  SummaryGrid,
  TitleBlock,
} from "./StyleShopCard";

function ShopCart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [deletedFoodId, setId] = useState(null);
  const [openAddOrder, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [openToastForAddOrder, setOpenToastForAddOrder] = useState(false);

  const { data, loading, refetch } = useQuery(GET_CARD_FOOD, {
    fetchPolicy: "cache-and-network",
  });

  const [deleteCart] = useMutation(DELETE_CART_ITEM);
  const [addOrder, { data: addData, error: addErr }] =
    useMutation(CREATE_ORDER);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data?.getCartItemsByUserId?.payload?.items) {
      setFoods(
        data.getCartItemsByUserId.payload.items.map((item) => ({
          ...item.food,
          quantity: item.quantity,
          cartId: item._id,
          price: item.price,
        })),
      );
      localStorage.setItem(
        "quontityLen",
        data?.getCartItemsByUserId?.payload?.items.length,
      );
    }
  }, [data]);

  const handleClickDeleteFood = (id) => {
    setId(id);
    setClickedDelete(true);
  };

  const handleClickDelete = async () => {
    try {
      await deleteCart({ variables: { food: deletedFoodId } });
      setOpenToast(true);
      refetch();
      setClickedDelete(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddOrder = async (formData) => {
    await addOrder({
      variables: {
        order: { address: [Number(formData.lat), Number(formData.lng)] },
      },
    })
      .then((res) => {
        if (res.data?.createOrder?.payload) {
          setOpenToastForAddOrder(true);
          refetch();
        }
      })
      .catch((err) => console.error(err.message));
  };

  const totalItems = data?.getCartItemsByUserId?.payload?.items?.length || 0;
  const totalPrice = data?.getCartItemsByUserId?.payload?.totalPrice || 0;
  const avgItemPrice = totalItems ? Math.round(totalPrice / totalItems) : 0;

  const formatUZS = (val) =>
    new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
    }).format(val);

  return (
    <HeaderDashborad>
      <Loader load={loading} />
      <PageWrapper>
        <OrderSearch
          quontityLen={totalItems}
          setFoods={setFoods}
          action="category"
          refetchItem={refetch}
        />

        <PageHeader>
          <TitleBlock>
            <h2>
              {t("cartFood")}
              <span>
                , {foods.length} {t("product")}
              </span>
            </h2>
            <p>{t("cartDescription")}</p>
          </TitleBlock>
        </PageHeader>

        {foods.length > 0 && (
          <SummaryGrid>
            <SummaryCard>
              <p>{t("products")}</p>
              <h4>{totalItems}</h4>
            </SummaryCard>
            <SummaryCard $accent>
              <p>{t("total")}</p>
              <h4>{formatUZS(totalPrice)}</h4>
            </SummaryCard>
            <SummaryCard>
              <p>{t("price")}</p>
              <h4>{formatUZS(avgItemPrice)}</h4>
            </SummaryCard>
          </SummaryGrid>
        )}

        {foods.length > 0 ? (
          <ContentGrid>
            <CartList>
              {foods.map((food) => (
                <FavouriteCard
                  checkElement="user"
                  isShopCart={false}
                  handleClickDeleteFood={handleClickDeleteFood}
                  key={food._id}
                  food={food}
                />
              ))}
            </CartList>

            <ConfirmOrder setOpen={setOpen} data={data} />
          </ContentGrid>
        ) : (
          <EmptyState>
            <img src={undefindImg} alt="Savat bo'sh" />
            <h3>{t("cartFood")}</h3>
            <p>{t("cartDescription")}</p>
            <NavBtn onClick={() => navigate("/foods")}>{t("foods")} →</NavBtn>
          </EmptyState>
        )}
      </PageWrapper>

      <DeleteFoodModalAlert
        open={clickedDelete}
        setOpen={setClickedDelete}
        onConfirm={handleClickDelete}
      />
      <AddOrder open={openAddOrder} setOpen={setOpen} onAdd={handleAddOrder} />
      <ToastExample
        status="success"
        title={t("foodIsDeleted")}
        open={openToast}
        setOpen={setOpenToast}
      />
      <ToastExample
        title={addData?.createOrder ? t("orderAdded") : addErr?.message}
        open={openToastForAddOrder}
        setOpen={setOpenToastForAddOrder}
      />
    </HeaderDashborad>
  );
}

export default ShopCart;
