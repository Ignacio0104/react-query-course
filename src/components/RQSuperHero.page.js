import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSuperHeroData } from '../hooks/useSuperHeroData'

const RQSuperHeroPage = () => {
  const {heroId} = useParams() //We get the information from the params
  const {isLoading,isError,error,data} = useSuperHeroData(heroId)
  if(isLoading){
    return <h2>Loading...</h2>
  }

  if(isError){
    return <h2>{error.message}</h2>
  }
  return (
    <h2>{data?.data.name} - {data?.data.alterEgo}</h2>
  )
}

export default RQSuperHeroPage