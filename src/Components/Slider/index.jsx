import { useQuery } from '@apollo/client/react';
import { GET_ALL_CATAGORIES } from '../AddFood/api';
import { useEffect, useState } from 'react';
import { StyleSlider } from './StyleSlider';
import { useNavigate } from 'react-router-dom';

function SliderImages() {
  const { data } = useQuery(GET_ALL_CATAGORIES);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (data?.getAllCategories?.payload) {
      setImages(data.getAllCategories.payload);
    }
  }, [data]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images]);

  const goTo = (index) => setActive(index);
  const next = () => setActive((prev) => (prev + 1) % images.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + images.length) % images.length);

  return (
    <StyleSlider>
      <div className="slider">
        <button className="nav prev" onClick={prev}>
          ❮
        </button>
        <button className="nav next" onClick={next}>
          ❯
        </button>

        <div className="slides">
          {images.map((item, index) => {
            return (
              <div
                onClick={() => {
                  navigate(`/categoriesById/${images[active]._id}`);
                }}
                className={`slide ${active === index ? 'active' : ''}`}
                key={item._id}
                style={{
                  backgroundImage: `url(${item.image})`,
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </div>

        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={active === index ? 'dot active' : 'dot'}
              onClick={() => goTo(index)}
            ></span>
          ))}
        </div>
      </div>
    </StyleSlider>
  );
}

export default SliderImages;
