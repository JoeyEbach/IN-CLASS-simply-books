/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useAuth } from '../utils/context/authContext';
// eslint-disable-next-line import/no-unresolved
import SignOut from '../components/Signout';

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <img alt="person-pic" src={user.photoUrl}></img>
      <h1>{user.displayName}</h1>
      <h2>{user.email}</h2>
      <p>{user.metadata.lastSignInTime}</p>
      <SignOut />
    </>
  );
}
