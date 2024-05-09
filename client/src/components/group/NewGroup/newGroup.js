import React from 'react'
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/uiReducer';

const NewGroup = () => {
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(uiActions.toggleModal());
  };

  return (
    <>
    <Row className='m-2'>
      <Form onSubmit={submitHandler}>
      <Button type='submit' className='btn btn-primary'>New Group</Button>
      </Form>
    </Row>
    </>
  );
};

export default NewGroup;