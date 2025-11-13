import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Carts.css';

function Carts({ carts, setCarts }) {
  return (
    <div className='carts-container'>
      <div className='products-container'>
        <div className='carts-items-container'>
          {carts.map((cart) => (
            <Card style={{ width: '18rem' }} key={cart.id}>
              <Card.Img variant='top' src={cart.thumbnailUrl} alt={cart.title} />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text>
                  <b>$</b>{cart.price.toFixed(2)}
                </Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() => setCarts(carts.filter((c) => c.id !== cart.id))}
                >
                  Remove from Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <h4>
        Items: {carts.length} — Total Price: $
        {carts
          .reduce((total, cart) => total + cart.price, 0)
          .toFixed(2)}
      </h4>

      <Button variant="outline-danger">
        Checkout
        </Button>
    </div>
  );
}

export default Carts;
