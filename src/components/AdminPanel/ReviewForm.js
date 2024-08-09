// src/components/ReviewForm.js

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AxiosInstance from '../../helpers/AxiosRequest';
import { toast } from 'react-toastify';

const ReviewForm = ({ productId,orderId, onClose,setReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post('order/review', {
        productId,
        orderId,
        rating,
        comment
      });
      toast.success('Review submitted successfully');
    
      setRating(0);
      setComment('');
      onClose(); // Close the review form after successful submission
      const reviewResponse = await AxiosInstance.get(`/order/getreviews?orderId=${orderId}&productId=${productId}`);
      setReview(reviewResponse?.data?.data[0].rating)
    } catch (error) {
      toast.error('Error submitting review');
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='mt-5'>
            Submit Review
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewForm;
