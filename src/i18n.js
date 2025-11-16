import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'en',
    resources: {
      en: {
        translation: {
          orderList: 'Order List',
          customer: 'Customer',
          foods: 'foods',
          categories: 'categories',
          favouriteFoods: 'Favourite Foods',
          logOut: 'Log Out',
          greeting: 'Hello',
          changePass: 'Change Password',
          searchPlaceHolder: 'Search here',
        },
      },
      uz: {
        translation: {
          orderList: "Buyurtma ro'yxati",
          customer: 'Mijoz',
          foods: 'Ovqatlar',
          categories: 'Tofalar',
          favouriteFoods: 'Sevimli taomlar',
          logOut: 'Chiqish',
          greeting: 'Salom',
          changePass: "Parolni o'zgartirish",
          searchPlaceHolder: 'Bu yerda qidiring',
        },
      },
      ru: {
        translation: {
          orderList: 'Список заказов',
          customer: 'Клиент',
          foods: 'продукты питания ',
          categories: 'категории',
          favouriteFoods: 'Любимая еда',
          logOut: 'Выйти',
          greeting: 'Привет',
          changePass: 'Изменить пароль',
          searchPlaceHolder: 'Искать здесь',
        },
      },
    },
  });
export default i18n;
