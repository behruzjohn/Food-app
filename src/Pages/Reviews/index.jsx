import { Container } from '@mui/material';
import HeaderDashborad from '../HeaderDashboard';
import { StyleDashboard } from '../StyleDashboard';

function ReviewsPg() {
  return (
    <HeaderDashborad>
      <Container maxWidth="lg">
        <div className="reviews-page">
          <h1>This a ReviewsPg page</h1>
        </div>
      </Container>
    </HeaderDashborad>
  );
}
export default ReviewsPg;
