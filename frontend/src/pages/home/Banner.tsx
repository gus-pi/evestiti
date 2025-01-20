import { Link } from 'react-router-dom';

import bannerImg from '../../assets/header.png';

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">UP TO 25% DISCOUNT ON</h4>
        <h1>Girl's fashion</h1>
        <p>
          Browse and discover incredible offers on clothing and accessories for
          women.
        </p>
        <button className="btn">
          <Link to="/shop">EXPLORE NOW</Link>
        </button>
      </div>
      <div className="header__image">
        <img src={bannerImg} alt="banner image" />
      </div>
    </div>
  );
};

export default Banner;
