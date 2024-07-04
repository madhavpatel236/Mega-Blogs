import React, { useEffect, useState } from 'react'
import { Containor, BlogForm } from '../components/index'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditBlog() {

    cosnt[posts, setPosts] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug)
                .then((post) => {
                    setPosts(post)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>\
            <Containor>
                <BlogForm blog={post}></BlogForm>
            </Containor>
        </div>
    ) : null
}

export default EditBlog