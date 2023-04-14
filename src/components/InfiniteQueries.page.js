import axios from 'axios'
import React, { Fragment } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'

const fetchColors=({pageParam = 1})=>{
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

const InfiniteQueriesPage = () => {
    const {isLoading,isError,error,data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage} = useInfiniteQuery( //hasNextPage comes from getNextPageParam
        ["colors"],
        fetchColors,
        {
            getNextPageParam: (lastPage, pages)=>{
                if(pages.length <4){
                    return pages.length + 1
                }else{
                    return undefined
                }
            }
        }
        )

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
                data?.pages.map((group,i)=>{ //infite query retun PAGES not DATA
                                             //We add this extra step by accessing the group
                    return (
                        <Fragment key={i}> 
                            {
                                group.data.map(color=>(
                                    <h2 key={color.id}>{color.label}</h2>
                                ))
                            }
                        </Fragment>
                    )
                })
            }
            <button disabled={!hasNextPage} onClick={fetchNextPage}>Load More</button>
        </div>
        <div>
            {isFetching && !isFetchingNextPage ? "Fetching..." : null} 
        </div>
    </>
  )
}

export default InfiniteQueriesPage