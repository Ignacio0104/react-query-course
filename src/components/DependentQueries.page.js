import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fectUserByEmail =(email)=>{
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId =(channelId)=>{
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

const DependentQueriesPage= ({email}) => {
    const {data:user}= useQuery(["user",email],()=>fectUserByEmail(email))
    const channelId = user?.data.channelId

    const {data:channel} = useQuery(["courses",channelId],()=>fetchCoursesByChannelId(channelId),{
        enabled:!!channelId //It equals the enable to the true or false depending if  channelId is null. Only after channelId is fetched, this will run
    })
    
  return (
    <div>DependentQueriesPage</div>
  )
}

export default DependentQueriesPage