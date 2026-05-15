import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "en",

    resources: {
      en: {
        translation: {
          // ── Sidebar ──
          orderList: "Orders",
          customer: "Customer",
          foods: "Foods",
          categories: "Categories",
          favouriteFoods: "Favourites",
          logOut: "Log Out",
          greeting: "Hello",
          changePass: "Change Password",
          lang: "Language",
          Til: "Language",

          // ── Search / Header ──
          searchPlaceHolder: "Search foods...",

          // ── Orders ──
          orderTitle: "My Orders",
          orderTitleAdmin: "All Orders",
          orderDescription: "Track and manage all your orders in one place.",
          orderDescAdmin: "View, manage and update the status of every order.",
          addOrder: "New Order",
          orderId: "Order ID",
          data: "Date",
          customerName: "Customer",
          location: "Location",
          amount: "Amount",
          statusOrder: "Status",
          actions: "Actions",
          acceptOrder: "Accept Order",
          rejectOrder: "Reject Order",
          newOrder: "New Order",
          orderAdded: "Order placed successfully",
          orderProduct: "Order Items",
          editOrder: "Edit Order",
          deleteOrder: "Delete Order",

          // ── Order status ──
          pending: "Pending",
          cooking: "Cooking",
          deleviring: "Delivering",
          received: "Received",
          allStatus: "All",
          finishedStatus: "Completed",

          // ── Customers ──
          customers: "Customers",
          customerDescription: "View and manage all registered customers.",
          customerId: "ID",
          joinDate: "Joined",
          totalSpent: "Total Spent",
          lastOrder: "Last Order",
          phoneNumber: "Phone",
          telegramId: "Telegram",
          role: "Role",

          // ── Foods ──
          foodsName: "Menu",
          foodsDescription: "Manage your dishes — add, edit or remove items.",
          price: "Price",
          newMenu: "Add Dish",
          addedNewFood: "New dish added!",
          addedNewCartFood: "Added to cart!",
          updatedFood: "Dish updated successfully",
          foodIsDeleted: "Dish deleted",
          createFood: "Create Dish",

          // ── Food form ──
          addNewFood: "Add New Dish",
          foodName: "Dish Name",
          foodShortName: "Short Name",
          foodDescription: "Description",
          foodPrice: "Price",
          foodDiscount: "Discount (%)",
          foodImgUrl: "Image URL",
          foodNameReq: "Dish name is required",
          foodShortNameReq: "Short name is required",
          categoryReq: "Category is required",
          descriptionReq: "Description is required",
          foodPriceReq: "Price is required",
          foodDescount: "Discount is required",
          foodImgReq: "Image is required",

          // ── Categories ──
          categoryPg: "Categories",
          categoryDescription: "Manage all food categories.",
          addCategory: "Add Category",
          addNewCategory: "New Category",
          categoryNamePlaceHolder: "Category name",
          categoryImgUrl: "Image URL",
          categoryNameReq: "Name is required",
          categoryImageReq: "Image is required",
          categoryAddSuccessfull: "Category added!",
          categoryIsDeleted: "Category deleted",
          categoryEdited: "Category updated",
          categoryTitle: "Edit Category",

          // ── Cart ──
          cartFood: "My Cart",
          cartDescription: "Your selected dishes are saved here.",
          totalPrice: "Total",
          addToCard: "Add to Cart",
          addToSavat: "Add to Cart",
          placeInHolder: "Place Order",
          gooBack: "Go Back",
          howMuchAdd: "Quantity",
          total: "Total",
          products: "Items",
          yourOrders: "Your Orders",
          withBehruzCard: "With TaomGo Card",
          withOutBehruzCard: "Without TaomGo Card",
          product: "item",

          // ── Favourites ──
          favouriteFoodTitle: "Favourites",
          favouriteDesc: "All your favourite dishes in one place.",
          addFavourite: "Save",
          addedToFavourite: "Saved to favourites",
          remove: "Remove",

          // ── Common ──
          edit: "Edit",
          delete: "Delete",
          cancel: "Cancel",
          add: "Add",
          update: "Update",
          change: "Save Changes",
          all: "All",
          status: "Status",
          qountity: "Qty",

          // ── Delete confirm ──
          areYouSure: "Are you sure?",
          areYouDescription: "This item will be permanently deleted.",
          areYouDescription2: "This action cannot be undone.",

          // ── Add Order (map) ──
          addOrderTitle: "Place New Order",
          enterYourLocation: "Select your location on the map",
          selectLat: "Latitude",
          selectLng: "Longitude",

          // ── Auth — Sign Up ──
          signUp: "Sign Up",
          signUpDesc: "TaomGo — your favourite food, delivered fast.",
          signUpName: "Full name",
          signUpPhone: "Phone number",
          namePlaceHolder: "Enter your name",
          phonePlaceHolder: "Enter your phone number",
          nameIsReq: "Name is required",
          phoneReq: "Phone is required",
          password: "Password",
          confirmPassword: "Confirm Password",
          passwordReq: "Password must be 8–16 characters",
          rule: "This field is required",
          characters: "characters",
          youHaveAccaunt: "Already have an account?",

          // ── Auth — Sign In ──
          login: "Sign In",
          userType: "Account type",
          dontHaveAcc: "Don't have an account?",
          roleIsReq: "Please select account type",
          phoneNum: "Phone number is required",
          enterYourPhoneNUm: "Enter your phone number",

          // ── Auth — Verify ──
          verfyCode: "Verification Code",
          verfyDescription: "Enter the 5-digit code sent to your phone.",
          weSentSms: "Code sent!",
          smsDesc: "Please enter the code we sent to your number.",
          confirm: "Confirm",
          dontWant: "Back to sign up",
          signIn: "Sign In",
          tryAgain: "Try Again",
          verify: "Verify",

          // ── Auth — Change Password ──
          forgotPass: "Change Password",
          dontWontChange: "Don't want to change?",

          // ── AI Assistant ──
          aiGreeting:
            "Hi! I am TaomGo AI 🤖\nHow can I help you find the perfect dish?",
          aiPlaceholder: "Ask for food recommendations...",
          aiOnline: "Online",
          aiTitle: "TaomGo AI",
          aiClear: "Clear chat",
          aiAddToCart: "Add to Cart",
          aiAdded: "Added!",
          aiNoResult: "No dishes found for your request 😔",
          aiSuggest1: "🌶️ Spicy foods",
          aiSuggest2: "🥗 Healthy options",
          aiSuggest3: "💰 Under 50,000",
          aiSuggest4: "🥩 Meat dishes",
          aiSuggest5: "⚡ Fast foods",
          aiSuggest6: "🍰 Desserts",

          pwdMin8: "At least 8 characters",
          pwdUppercase: "Uppercase letter (A–Z)",
          pwdNumber: "Number (0–9)",
          pwdMatch: "Passwords match",
          pwdNoMatch: "Passwords do not match",
          pwdSecurity: "Update your security",

          newPassword: "New Password",
          oldPassword: "Old Password",
          confirmNewPw: "Confirm New Password",
          pwdChanged: "Password changed successfully",
        },
      },

      uz: {
        translation: {
          // ── Sidebar ──
          orderList: "Buyurtmalar",
          customer: "Mijoz",
          foods: "Taomlar",
          categories: "Kategoriyalar",
          favouriteFoods: "Sevimlilar",
          logOut: "Chiqish",
          greeting: "Salom",
          changePass: "Parolni o'zgartirish",
          lang: "Til",
          Til: "Til",

          // ── Search / Header ──
          searchPlaceHolder: "Taom qidiring...",

          // ── Orders ──
          orderTitle: "Buyurtmalarim",
          orderTitleAdmin: "Barcha buyurtmalar",
          orderDescription: "Barcha buyurtmalaringizni bir joyda kuzating.",
          orderDescAdmin: "Barcha buyurtmalarni ko'ring va boshqaring.",
          addOrder: "Buyurtma berish",
          orderId: "Buyurtma №",
          data: "Sana",
          customerName: "Mijoz",
          location: "Manzil",
          amount: "Summa",
          statusOrder: "Holat",
          actions: "Amallar",
          acceptOrder: "Qabul qilish",
          rejectOrder: "Rad etish",
          newOrder: "Yangi buyurtma",
          orderAdded: "Buyurtma muvaffaqiyatli qabul qilindi",
          orderProduct: "Buyurtma tarkibi",
          editOrder: "Tahrirlash",
          deleteOrder: "O'chirish",

          // ── Order status ──
          pending: "Kutilmoqda",
          cooking: "Tayyorlanmoqda",
          deleviring: "Yetkazilmoqda",
          received: "Yetkazildi",
          allStatus: "Barchasi",
          finishedStatus: "Yakunlangan",

          // ── Customers ──
          customers: "Mijozlar",
          customerDescription: "Barcha ro'yxatdan o'tgan mijozlarni ko'ring.",
          customerId: "ID",
          joinDate: "Qo'shilgan",
          totalSpent: "Jami sarflagan",
          lastOrder: "Oxirgi buyurtma",
          phoneNumber: "Telefon",
          telegramId: "Telegram",
          role: "Rol",

          // ── Foods ──
          foodsName: "Menyu",
          foodsDescription:
            "Taomlarni boshqaring — qo'shing, tahrirlang yoki o'chiring.",
          price: "Narxi",
          newMenu: "Taom qo'shish",
          addedNewFood: "Yangi taom qo'shildi!",
          addedNewCartFood: "Savatga qo'shildi!",
          updatedFood: "Taom yangilandi",
          foodIsDeleted: "Taom o'chirildi",
          createFood: "Taom yaratish",

          // ── Food form ──
          addNewFood: "Yangi taom qo'shish",
          foodName: "Taom nomi",
          foodShortName: "Qisqa nom",
          foodDescription: "Tavsif",
          foodPrice: "Narxi",
          foodDiscount: "Chegirma (%)",
          foodImgUrl: "Rasm URL",
          foodNameReq: "Taom nomi majburiy",
          foodShortNameReq: "Qisqa nom majburiy",
          categoryReq: "Kategoriya majburiy",
          descriptionReq: "Tavsif majburiy",
          foodPriceReq: "Narxi majburiy",
          foodDescount: "Chegirma majburiy",
          foodImgReq: "Rasm majburiy",

          // ── Categories ──
          categoryPg: "Kategoriyalar",
          categoryDescription: "Barcha kategoriyalarni boshqaring.",
          addCategory: "Kategoriya qo'shish",
          addNewCategory: "Yangi kategoriya",
          categoryNamePlaceHolder: "Kategoriya nomi",
          categoryImgUrl: "Rasm URL",
          categoryNameReq: "Nom majburiy",
          categoryImageReq: "Rasm majburiy",
          categoryAddSuccessfull: "Kategoriya qo'shildi!",
          categoryIsDeleted: "Kategoriya o'chirildi",
          categoryEdited: "Kategoriya yangilandi",
          categoryTitle: "Kategoriyani tahrirlash",

          // ── Cart ──
          cartFood: "Savatcha",
          cartDescription: "Buyurtma berishdan oldin tanlangan taomlar.",
          totalPrice: "Jami",
          addToCard: "Savatga",
          addToSavat: "Savatga qo'shish",
          placeInHolder: "Buyurtma berish",
          gooBack: "Orqaga",
          howMuchAdd: "Miqdor",
          total: "Jami",
          products: "Mahsulotlar",
          yourOrders: "Buyurtmalaringiz",
          withBehruzCard: "TaomGo karta bilan",
          withOutBehruzCard: "TaomGo kartasiz",
          product: "ta",

          // ── Favourites ──
          favouriteFoodTitle: "Sevimlilar",
          favouriteDesc: "Sevimli taomlaringiz bir joyda.",
          addFavourite: "Saqlash",
          addedToFavourite: "Sevimlilarga qo'shildi",
          remove: "Olib tashlash",

          // ── Common ──
          edit: "Tahrirlash",
          delete: "O'chirish",
          cancel: "Bekor qilish",
          add: "Qo'shish",
          update: "Yangilash",
          change: "Saqlash",
          all: "Barchasi",
          status: "Holat",
          qountity: "Miqdor",

          // ── Delete confirm ──
          areYouSure: "Ishonchingiz komilmi?",
          areYouDescription: "Bu element butunlay o'chirib tashlanadi.",
          areYouDescription2: "Bu amalni ortga qaytarib bo'lmaydi.",

          // ── Add Order ──
          addOrderTitle: "Buyurtma berish",
          enterYourLocation: "Xaritadan manzilingizni tanlang",
          selectLat: "Kenglik",
          selectLng: "Uzunlik",

          // ── Auth — Sign Up ──
          signUp: "Ro'yxatdan o'tish",
          signUpDesc: "TaomGo — sevimli taomingiz, tez yetkaziladi.",
          signUpName: "To'liq ism",
          signUpPhone: "Telefon raqam",
          namePlaceHolder: "Ismingizni kiriting",
          phonePlaceHolder: "Telefon raqamingiz",
          nameIsReq: "Ism majburiy",
          phoneReq: "Telefon majburiy",
          password: "Parol",
          confirmPassword: "Parolni tasdiqlang",
          passwordReq: "Parol 8–16 ta belgidan iborat bo'lishi kerak",
          rule: "Bu maydon majburiy",
          characters: "belgi",
          youHaveAccaunt: "Akkauntingiz bormi?",

          // ── Auth — Sign In ──
          login: "Kirish",
          userType: "Akkaunt turi",
          dontHaveAcc: "Akkauntingiz yo'qmi?",
          roleIsReq: "Akkaunt turini tanlang",
          phoneNum: "Telefon raqam majburiy",
          enterYourPhoneNUm: "Telefon raqamingizni kiriting",

          // ── Auth — Verify ──
          verfyCode: "Tasdiqlash kodi",
          verfyDescription:
            "Telefoningizga yuborilgan 5 xonali kodni kiriting.",
          weSentSms: "Kod yuborildi!",
          smsDesc: "Telefon raqamingizga yuborilgan kodni kiriting.",
          confirm: "Tasdiqlash",
          dontWant: "Ro'yxatdan o'tishga qaytish",
          signIn: "Kirish",
          tryAgain: "Qayta urinish",
          verify: "Tasdiqlash",

          // ── Auth — Change Password ──
          forgotPass: "Parolni o'zgartirish",
          dontWontChange: "O'zgartirmoqchi emassizmi?",

          // ── AI Assistant ──
          aiGreeting:
            "Salom! Men TaomGo AI yordamchisiman 🤖\nQanday taom qidiryapsiz?",
          aiPlaceholder: "Taom so'rang...",
          aiOnline: "Faol",
          aiTitle: "TaomGo AI",
          aiClear: "Tozalash",
          aiAddToCart: "Savatga",
          aiAdded: "Qo'shildi!",
          aiNoResult: "So'rovingizga mos taom topilmadi 😔",
          aiSuggest1: "🌶️ Achchiq taomlar",
          aiSuggest2: "🥗 Sog'lom ovqatlar",
          aiSuggest3: "💰 50 000 so'm gacha",
          aiSuggest4: "🥩 Go'sht taomlar",
          aiSuggest5: "⚡ Tez taomlar",
          aiSuggest6: "🍰 Desertlar",

          pwdMin8: "Kamida 8 ta belgi", // uz
          pwdUppercase: "Katta harf (A–Z)", // uz
          pwdNumber: "Raqam (0–9)", // uz
          pwdMatch: "Parollar mos keldi", // uz
          pwdNoMatch: "Parollar mos kelmadi", // uz
          pwdSecurity: "Xavfsizlikni yangilang",

          newPassword: "Yangi parol",
          oldPassword: "Eski parol",
          confirmNewPw: "Yangi parolni tasdiqlang",
          pwdChanged: "Parol muvaffaqiyatli o'zgartirildi",
        },
      },

      ru: {
        translation: {
          // ── Sidebar ──
          orderList: "Заказы",
          customer: "Клиент",
          foods: "Блюда",
          categories: "Категории",
          favouriteFoods: "Избранное",
          logOut: "Выйти",
          greeting: "Привет",
          changePass: "Сменить пароль",
          lang: "Язык",
          Til: "Язык",

          // ── Search / Header ──
          searchPlaceHolder: "Поиск блюд...",

          // ── Orders ──
          orderTitle: "Мои заказы",
          orderTitleAdmin: "Все заказы",
          orderDescription: "Отслеживайте все заказы в одном месте.",
          orderDescAdmin: "Просматривайте и управляйте всеми заказами.",
          addOrder: "Новый заказ",
          orderId: "№ заказа",
          data: "Дата",
          customerName: "Клиент",
          location: "Адрес",
          amount: "Сумма",
          statusOrder: "Статус",
          actions: "Действия",
          acceptOrder: "Принять",
          rejectOrder: "Отклонить",
          newOrder: "Новый заказ",
          orderAdded: "Заказ успешно оформлен",
          orderProduct: "Состав заказа",
          editOrder: "Редактировать",
          deleteOrder: "Удалить",

          // ── Order status ──
          pending: "Ожидает",
          cooking: "Готовится",
          deleviring: "Доставляется",
          received: "Доставлен",
          allStatus: "Все",
          finishedStatus: "Завершённые",

          // ── Customers ──
          customers: "Клиенты",
          customerDescription:
            "Просматривайте всех зарегистрированных клиентов.",
          customerId: "ID",
          joinDate: "Дата регистрации",
          totalSpent: "Итого потрачено",
          lastOrder: "Последний заказ",
          phoneNumber: "Телефон",
          telegramId: "Telegram",
          role: "Роль",

          // ── Foods ──
          foodsName: "Меню",
          foodsDescription:
            "Управляйте блюдами — добавляйте, редактируйте или удаляйте.",
          price: "Цена",
          newMenu: "Добавить блюдо",
          addedNewFood: "Новое блюдо добавлено!",
          addedNewCartFood: "Добавлено в корзину!",
          updatedFood: "Блюдо обновлено",
          foodIsDeleted: "Блюдо удалено",
          createFood: "Создать блюдо",

          // ── Food form ──
          addNewFood: "Добавить блюдо",
          foodName: "Название блюда",
          foodShortName: "Краткое название",
          foodDescription: "Описание",
          foodPrice: "Цена",
          foodDiscount: "Скидка (%)",
          foodImgUrl: "URL изображения",
          foodNameReq: "Название обязательно",
          foodShortNameReq: "Краткое название обязательно",
          categoryReq: "Категория обязательна",
          descriptionReq: "Описание обязательно",
          foodPriceReq: "Цена обязательна",
          foodDescount: "Скидка обязательна",
          foodImgReq: "Изображение обязательно",

          // ── Categories ──
          categoryPg: "Категории",
          categoryDescription: "Управляйте всеми категориями блюд.",
          addCategory: "Добавить категорию",
          addNewCategory: "Новая категория",
          categoryNamePlaceHolder: "Название категории",
          categoryImgUrl: "URL изображения",
          categoryNameReq: "Название обязательно",
          categoryImageReq: "Изображение обязательно",
          categoryAddSuccessfull: "Категория добавлена!",
          categoryIsDeleted: "Категория удалена",
          categoryEdited: "Категория обновлена",
          categoryTitle: "Редактировать категорию",

          // ── Cart ──
          cartFood: "Корзина",
          cartDescription: "Выбранные блюда сохранены здесь.",
          totalPrice: "Итого",
          addToCard: "В корзину",
          addToSavat: "Добавить в корзину",
          placeInHolder: "Оформить заказ",
          gooBack: "Назад",
          howMuchAdd: "Количество",
          total: "Итого",
          products: "Товары",
          yourOrders: "Ваши заказы",
          withBehruzCard: "С картой TaomGo",
          withOutBehruzCard: "Без карты TaomGo",
          product: "шт.",

          // ── Favourites ──
          favouriteFoodTitle: "Избранное",
          favouriteDesc: "Все ваши любимые блюда в одном месте.",
          addFavourite: "Сохранить",
          addedToFavourite: "Добавлено в избранное",
          remove: "Убрать",

          // ── Common ──
          edit: "Редактировать",
          delete: "Удалить",
          cancel: "Отмена",
          add: "Добавить",
          update: "Обновить",
          change: "Сохранить",
          all: "Все",
          status: "Статус",
          qountity: "Кол-во",

          // ── Delete confirm ──
          areYouSure: "Вы уверены?",
          areYouDescription: "Этот элемент будет удалён навсегда.",
          areYouDescription2: "Это действие нельзя отменить.",

          // ── Add Order ──
          addOrderTitle: "Оформить заказ",
          enterYourLocation: "Выберите адрес на карте",
          selectLat: "Широта",
          selectLng: "Долгота",

          // ── Auth — Sign Up ──
          signUp: "Регистрация",
          signUpDesc: "TaomGo — любимая еда, доставка быстро.",
          signUpName: "Полное имя",
          signUpPhone: "Номер телефона",
          namePlaceholder: "Введите имя",
          phonePlaceHolder: "Введите номер телефона",
          nameIsReq: "Имя обязательно",
          phoneReq: "Телефон обязателен",
          password: "Пароль",
          confirmPassword: "Подтвердите пароль",
          passwordReq: "Пароль: 8–16 символов",
          rule: "Поле обязательно",
          characters: "символов",
          youHaveAccaunt: "Уже есть аккаунт?",

          // ── Auth — Sign In ──
          login: "Войти",
          userType: "Тип аккаунта",
          dontHaveAcc: "Нет аккаунта?",
          roleIsReq: "Выберите тип аккаунта",
          phoneNum: "Телефон обязателен",
          enterYourPhoneNUm: "Введите номер телефона",

          // ── Auth — Verify ──
          verfyCode: "Код подтверждения",
          verfyDescription:
            "Введите 5-значный код, отправленный на ваш телефон.",
          weSentSms: "Код отправлен!",
          smsDesc: "Введите код, отправленный на ваш номер.",
          confirm: "Подтвердить",
          dontWant: "Вернуться к регистрации",
          signIn: "Войти",
          tryAgain: "Попробовать снова",
          verify: "Подтвердить",

          // ── Auth — Change Password ──
          forgotPass: "Смена пароля",
          dontWontChange: "Не хотите менять пароль?",

          // ── AI Assistant ──
          aiGreeting:
            "Привет! Я AI-помощник TaomGo 🤖\nЧто вы хотите заказать?",
          aiPlaceholder: "Спросите про блюда...",
          aiOnline: "Онлайн",
          aiTitle: "TaomGo AI",
          aiClear: "Очистить",
          aiAddToCart: "В корзину",
          aiAdded: "Добавлено!",
          aiNoResult: "По вашему запросу ничего не найдено 😔",
          aiSuggest1: "🌶️ Острые блюда",
          aiSuggest2: "🥗 Здоровое питание",
          aiSuggest3: "💰 До 50 000 сум",
          aiSuggest4: "🥩 Мясные блюда",
          aiSuggest5: "⚡ Быстрая еда",
          aiSuggest6: "🍰 Десерты",

          pwdMin8: "Минимум 8 символов",
          pwdUppercase: "Заглавная буква (A–Z)",
          pwdNumber: "Цифра (0–9)",
          pwdMatch: "Пароли совпадают",
          pwdNoMatch: "Пароли не совпадают",
          pwdSecurity: "Обновите безопасность",

          newPassword: "Новый пароль",
          oldPassword: "Старый пароль",
          confirmNewPw: "Подтвердите новый пароль",
          pwdChanged: "Пароль успешно изменён",
        },
      },
    },
  });

export default i18n;
