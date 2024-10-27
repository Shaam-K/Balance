import { Button } from '@/components/ui/button';
import { db } from '@/config/firebase';
import { UserAuth } from '@/context/AuthContext';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const DeleteIssue = () => {
  const {areaId, postId} = useParams();
  const {user} = UserAuth();
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (areaId && postId && user) {
      try {
        const postRef = collection(db,"areas", areaId, "posts")
        await deleteDoc(doc(postRef, postId));


        const userRef = collection(db,"users", user.uid, "posts")
        await deleteDoc(doc(userRef, postId));

        alert('successfully deleted!');
        navigate("/dash");
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <section className='w-10/12 mx-auto mt-[10vh]'>
      <h1 className='text-2xl'>Are you sure you want to delete this post?</h1>
      <h1 className='text-lg text-red-400 my-3'>This action cant be undone</h1>
      <Button onClick={handleDelete}>Delete</Button>
    </section>
  )
}

export default DeleteIssue