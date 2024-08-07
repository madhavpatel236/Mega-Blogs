import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { Containor, IndividualCard } from '../components/index'

function Home() {
    const [Posts, setPosts] = useState([])
    console.log(Posts)
    useEffect(() => {
        service.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
    }, [])

    if (Posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Containor>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Containor>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Containor>
                <div className='flex flex-wrap'>
                    {Posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <IndividualCard {...post} />
                        </div>
                    ))}
                </div>
            </Containor>
        </div>
    )
}


export default Home