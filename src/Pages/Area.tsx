import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Area = () => {   
    const [areas, setAreas] = useState([]);

    useEffect(() => {
      const handleAreas = async () => {
        try {
          const areasRef = collection(db,"areas");
          const getAreas = await getDocs(areasRef);

          
        } catch (err) {
          console.log(err);
        }
      }
    },[])
  return (
    <section className="w-11/12 mx-auto">
    </section>
  )
}


export default Area