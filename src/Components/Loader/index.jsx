import { StyleLoader } from './StyleLoader';

function Loader({ load }) {
  return (
    <StyleLoader status={load}>
      <div className="loader"></div>
    </StyleLoader>
  );
}
export default Loader;
