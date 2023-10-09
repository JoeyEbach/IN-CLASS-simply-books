import React, { useState, useEffect } from 'react';
import { getAuthors } from '../api/authorData';
import { useAuth } from '../utils/context/authContext';
import AuthorCard from '../components/AuthorCard';

function Authors() {
  const [author, setAuthor] = useState([]);

  const { user } = useAuth();

  const getAllTheAuthors = () => {
    getAuthors(user.uid).then(setAuthor);
  };

  useEffect(() => {
    getAllTheAuthors();
  });

  return (
    <div>
      {author.map((authors) => <AuthorCard key={authors.firebaseKey} authorObj={authors} />)}
    </div>
  );
}

export default Authors;
