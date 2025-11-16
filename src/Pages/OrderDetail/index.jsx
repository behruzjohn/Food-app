import { Button, Container, Rating } from '@mui/material';
import { StyleOrderDetail } from '../CategoriesPage/StyleCategories';
import OrderSearch from '../../Components/OrderSearch/index';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import defualtImg from '../../assets/defualt-user.png';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import CheckToken from '../../Components/CheckToken';

function OrderDetail() {
  CheckToken();
  return (
    <HeaderDashborad>
      <Container maxWidth="xl">
        <StyleOrderDetail className="order-detail">
          <div className="order-detail-nav">
            <OrderSearch />
            <div className="order-detail-contained">
              <div className="customer-info">
                <div className="customer-info-nav">
                  <img src={defualtImg} alt="" />
                  <h3>Wahyu Adi Kurniawan</h3>
                  <Button variant="contained">Customer</Button>
                  <div className="note-order">
                    <div className="note-texts">
                      <h3>Note Order</h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestias saepe autem repellat unde quis et magni nam
                        non?
                      </p>
                    </div>
                    <div className="location">
                      <button>
                        <LocalShippingIcon />
                      </button>
                      <p>6 The Avenue, London EC50 4GN</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-table">
                <table>
                  <thead>
                    <tr>
                      <th id="left-radius">Items</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total Price</th>
                      <th id="right-radius"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="card">
                          <img src={defualtImg} alt="" />
                          <div className="card-text">
                            <p>MAIN COURSE</p>
                            <h4>Watermelon juice with ice</h4>
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <Rating
                                style={{ color: 'yellow' }}
                                name="half-rating-read"
                                defaultValue={2.5}
                                precision={0.5}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>5x</td>
                      <td>$10.8</td>
                      <td>$50.8</td>
                      <td>
                        <HighlightOffIcon style={{ color: 'red' }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </StyleOrderDetail>
      </Container>
    </HeaderDashborad>
  );
}

export default OrderDetail;
