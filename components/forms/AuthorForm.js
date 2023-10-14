import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createAuthor, getAuthors, updateAuthor } from '../../api/authorData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  favorite: false,
  image: '',
};

function AuthorForm({ authObj }) {
  console.warn(authObj);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAuthors(user.uid).then();
    if (authObj.firebaseKey) setFormInput(authObj);
  }, [authObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authObj.firebaseKey) {
      updateAuthor(formInput).then(() => router.push(`/author/${authObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateAuthor(patchPayload).then(() => {
          router.push('/authors');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{authObj.firebaseKey ? 'Update' : 'Create'} Author</h2>
      <FloatingLabel controlId="floatingInput1" label="Author First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Author's First Name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Author Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Author's Last Name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Author Image" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Author's Image"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Author Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Author's Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput5" label="Favorite Author" className="mb-3">
        <Form.Control
          type="switch"
          label="Favorite?"
          name="favorite"
          value={formInput.favorite}
          onChange={handleChange}
        />
      </FloatingLabel>

      <Button type="submit">
        {authObj.firebaseKey ? 'Update Author' : 'Submit Author'}
      </Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  authObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    favorite: PropTypes.bool,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  authObj: initialState,
};

export default AuthorForm;
