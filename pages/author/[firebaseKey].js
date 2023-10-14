import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  const getDetails = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <h1>
        {`${authorDetails.first_name} ${authorDetails.last_name}`}
      </h1>
      <h5>
        <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
      </h5>
      <p className="card-text bold">{authorDetails.favorite ? ' 🤍' : ''}</p>
      <div style={{ width: '100px' }}>
        {authorDetails.books?.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getDetails} />
        ))}
      </div>
    </>

  // {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
  //       {/* <Link href={`/author/${authorObj.firebaseKey}`} passHref>
  //         <Button variant="primary" className="m-2">VIEW</Button>
  //       </Link>
  //       {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
  //       {/* <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
  //         <Button variant="info">EDIT</Button>
  //       </Link> */}
  //       {/* <Button variant="danger" onClick={deleteThisBook} className="m-2">
  //         DELETE
  //       </Button> */}
  );
}
