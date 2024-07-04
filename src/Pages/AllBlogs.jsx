import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Containor, IndividualCard } from '../components/index'

function AllBlogs() {

    const [posts, setPosts] = useState([])
    useEffect(() => { }, [])

    service.getPost([])
        .then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })

    return (
        <div className='w-full py-8'>
            <Containor>
                <div className='flex flex-wrap'>
                    {
                        posts.map((Singlepost) => (
                            <div key={Singlepost.$id} className='p-2 w-1/4'>
                                <IndividualCard post={Singlepost} />
                            </div>
                        ))
                    }
                </div>
            </Containor>
        </div>
    )
}

export default AllBlogs