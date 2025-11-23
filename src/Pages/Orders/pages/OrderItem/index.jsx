import { t } from 'i18next';
import HeaderDashborad from '../../../../Components/HeaderDashboard';

function OrderItem() {
  return (
    <HeaderDashborad>
      <Container maxWidth="xl">
        <div className="order-items">
          <div className="orderItems-nav">
            <OrderSearch action="category"></OrderSearch>
            <div className="category-nav">
              <header>
                <div>
                  <h2>{t('categoryPg')}</h2>
                  <p>{t('categoryDescription')}</p>
                </div>
              </header>
              <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}
                className="card"
              >
                {/* {categories?.map((category) => {
                  return (
                    <CategoryCard
                      setClickedDelete={setClickedDelete}
                      setOpenToast={setOpenToastDelete}
                      category={category}
                      setDeletedCategoryId={setDeletedCategoryId}
                    ></CategoryCard>
                  );
                })} */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </HeaderDashborad>
  );
}
export default OrderItem;
