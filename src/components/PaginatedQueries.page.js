import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

const fetchColors = (pageNumber)=>{
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
    //"http://localhost:4000/colors?_limit=2" that bring us only 2 results
    //"http://localhost:4000/colors?_limit=2&_page=1" bring us the first page
}

const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const {isLoading,isError,error,data} = useQuery(["colors",pageNumber],()=>fetchColors(pageNumber),{
        keepPreviousData:true //Saves the data from the previous page 
    });

    if(isLoading){
        return <h2>Loading...</h2>
    }

    if(isError){
        return <h2>{error.message}</h2>
    }
  return (
    <>
        <div>
            {
                data?.data.map((color)=>{
                    return (
                        <div key={color.id}>
                            <h2>{color.id} - {color.label}</h2>
                        </div>
                    )
                })
            }
        </div>
        <div>
            <button onClick={()=>setPageNumber(page=>page -1)} disabled={pageNumber===1}>Previous page</button>
            <button onClick={()=>setPageNumber(page=>page +1)} disabled={pageNumber===4}>Next page</button>
        </div>
    </>
  )
}

export default PaginatedQueriesPage