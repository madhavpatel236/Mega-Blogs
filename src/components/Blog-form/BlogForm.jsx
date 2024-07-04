// this is the main blog editor form in which we can edit or create a blogs.
// we have one property in the useForm() which is watch, from the watch we can watch the element. in simple term of any cahnges are occure then we will watch then and from this property we changed any thing fro the batter understanding we have one usecase of that in this file.


import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function BlogForm({ blog }) { // here {blog} we get the full blog data in the case of the edit blog. 

    const { register, handelSubmit, watch, setValue, control, getValue } = useForm({
        defaultValues: {
            title: blog ? blog.title : "",
            content: blog ? blog.content : "",
            slug: blog ? blog.slug : "",
            status: blog ? blog.status : "",
        }
    })


    const navigate = useNavigate()
    const userData = useSelector((state) => state.user.data)


    // for the slug input field 
    const slugTransform = useCallback((value) => { // in the value we have a title of the blog
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')
        }
    }, [])

    React.useEffect(() => {

        const subscription = watch((value, { name }) => {  // here { name } is the watched field, in our case which is 'title' and value is the current value of the watch field (title). 
            if (name === 'title') {  // here at the time of watch we chech that if watched field is title then...
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })
        // retern for the batter optimization
        return () => {
            subscription.unsubscribe();
        }

    }, [watch, slugTransform, setValue])

    const Blog = async (data) => { // here at the data we get the changed value by the user
        // If we have go for the Edit the Blog.
        if (blog) {
            const file = data.image[0] ? service.uplodeFile(data.image[0]) : null // here we check that if new data.image are there then update the image of the blog.

            if (file) {
                const deleteOldFile = await service.deleteFile(blog.featuredImage) // here we delete the old present image of the blog.
            }

            const updateBlog = await service.updatePost(blog.$id, {   // after the uplode and delete the blog we update the blog. for that we need a blog.$id for updat the post in apperite services. 
                ...data,
                featuredImage: file ? file.$id : undefined, // here if we change the image then we also need to update the file.$id
            });
            if (updateBlog) {
                navigate(`/blog/ ${updatePost.$id}`);
            };

        }

        // if we create a new post 
        else {
            const uplodeFile = await service.uplodeFile(data.image[0])

            if (uplodeFile) {
                const fileId = uplodeFile.$id
                data.featuredImage = fileId
                const createPost = await service.createPost({
                    ...data,
                    userId: userData.$id, // userdata come from the store by the useselector.
                })
                if (createPost) {
                    navigate(`/blog/${createPost.$id}`)
                }
            }
        }
    }

    return (
        <form onSubmit={BlogForm} className='flex lfex-wrap'>
            <div className="w-2/3 px-2">
                <Input
                    lable="Title: "
                    placeholder="Title: "
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    lable="Slug: "
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}  // here we connect or control the RTE editor
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default BlogForm