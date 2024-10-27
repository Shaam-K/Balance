import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Area = () => {
    const {areaid} = useParams();

    useEffect(() => {

    },[])
  return (
    <section className="w-11/12 mx-auto">
        {areaid}
    </section>
  )
}

export default Area