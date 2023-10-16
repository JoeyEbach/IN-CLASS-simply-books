import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteOrder } from '../api/orderData';

function OrderCard({ orderObj, onUpdate }) {
  const deleteAnOrder = () => {
    if (window.confirm(`Do you want to delete order by ${orderObj.customer_name}?`)) {
      deleteOrder(orderObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{orderObj.customer_name}</Card.Title>
        <Card.Text>{orderObj.dateCreated}</Card.Text>
        <Link href={`/order/${orderObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE order DETAILS  */}
        <Link href={`/order/edit/${orderObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteAnOrder} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    customer_name: PropTypes.string,
    email: PropTypes.string,
    orderType: PropTypes.string,
    firebaseKey: PropTypes.string,
    dateCreated: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderCard;
