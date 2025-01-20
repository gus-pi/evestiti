import dealsImg from '../../assets/deals.png';

const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="deal" />
      </div>
      <div className="deals__content">
        <h5>Get Up To 20% Discounts</h5>
        <h4>Deals Of The Month</h4>
        <p>
          Deals for the month of January, make sure to take advantage of this
          amazing deals on clothing, accessories, footwear and many more!
        </p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Hours</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
