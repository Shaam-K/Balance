import { Button } from '@/components/ui/button';
import { db } from '@/config/firebase';
import { UserAuth } from '@/context/AuthContext';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const CreateArea = () => {
    const {id} = useParams();
    const {user} = UserAuth();
    const [areaName, setAreaName] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            if (user.uid !== id) {
                navigate('/');
            }
        }
    },[user])

    const createArea = async () => {
        const areaToken = areaName.slice(0, 4) +
        Math.trunc(Math.random() * 10).toString() +
        Date.now().toString().slice(-6, -1);


        try {
            if (user) {
                const setArea = await setDoc(doc(db,"areas", areaToken), {
                    areaName: areaName
                })

                const adUp = await setDoc(doc(db,"users", user.uid), {areaToken: areaToken}, {merge: true});

                navigate(`/area/${areaToken}`)
            }
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <section className='w-11/12 mx-auto'>
        <h1 className='text-2xl mb-3'>Create Area</h1>
        <div className='grid gap-3 md:w-2/3'>
            <label htmlFor="">Enter Area Name</label>
            <input type="text" className='bg-inherit' value={areaName} onChange={(e) => {
                setAreaName(e.target.value);
            }} placeholder='Name' />
            <Button onClick={createArea} className='max-w-sm'>Create Area</Button>
        </div>

    </section>
  )
}

export default CreateArea