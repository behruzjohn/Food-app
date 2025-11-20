const SECTIONS = {
  addFood: {
    admin: { addFood: true },
    user: { addFood: false },
  },
  foodCard: {
    admin: { edit: true, delete: true, addToCard: false, addFavourite: false },
    user: { edit: false, delete: false, addToCard: true, addFavourite: true },
  },
  category: {
    admin: { view: true, delete: true, addCategory: true },
    user: { view: true, delete: false, addCategory: false },
  },
  newMenu: {
    admin: { create: true },
    user: { create: false },
  },
  foodFavourite: {
    admin: { icon: false, delete: true, addCategory: false },
    user: { icon: true, delete: true, addCategory: false },
  },
  headerDashboard: {
    admin: { faovuriteLink: false, customer: true },
    user: { faovuriteLink: true, customer: false },
  },
  order: {
    admin: { addOrder: false },
    user: { addOrder: true },
  },
};
const GuardComponent = ({ role, section, action, children }) => {
  const hasAccess = SECTIONS[section]?.[role]?.[action];

  return hasAccess ? children : <></>;
};
export default GuardComponent;
