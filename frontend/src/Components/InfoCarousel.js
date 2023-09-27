import Carousel from 'react-bootstrap/Carousel';
import banner from '../images/banner.jpeg';

function UncontrolledExample() {
  return (
    <div style={{marginTop: 50 + 'em'}}>
     <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner}
          alt="First slide"
          style={{height:800}}
        />
        <Carousel.Caption>
          <h3>202 Gym</h3>
          <p>World class Amenities</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner}
          alt="Second slide"
          style={{  height:800}}
        />

        <Carousel.Caption>
          <h3>202 Gym</h3>
          <p>Best trainers</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner}
          alt="Third slide"
          style={{  height:800}}
        />

        <Carousel.Caption>
          <h3>202 Gym</h3>
          <p>
            Flexible membership plans
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel></div>
  );
}

export default UncontrolledExample;