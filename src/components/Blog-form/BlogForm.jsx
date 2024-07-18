// this is the main blog editor form in which we can edit or create a blogs.
// we have one property in the useForm() which is watch, from the watch we can watch the element. in simple term of any cahnges are occure then we will watch then and from this property we changed any thing fro the batter understanding we have one usecase of that in this file.


import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Select, RTE } from '../index'
import Input from '../Input'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function BlogForm({ blog }) { // here {blog} we get the full blog data in the case of the edit blog. 

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: blog ? blog.title : "",

            content: blog ? blog.content : "",
            slug: blog ? blog.slug : "",
            status: blog ? blog.status : "",
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const Blog = async (data) => { // here at the data we get the changed value by the user
        // If we have go for the Edit the Blog.
        console.log(data)
        if (blog) {
            const file = data.featuredImage[0] ? service.uploadFile(data.featuredImage[0]) : null // here we check that if new data.image are there then update the image of the blog.

            if (file) {
                await service.deleteFile(blog.featuredImage) // here we delete the old present image of the blog.
            }

            const updateBlog = await service.updatePost(blog.$id, {   // after the uplode and delete the blog we update the blog. for that we need a blog.$id for updat the post in apperite services. 
                ...data,
                featuredImage: file ? file.$id : undefined, // here if we change the image then we also need to update the file.$id
            });
            if (updateBlog) {
                navigate(`/blog/ ${updateBlog.$id}`);
            };
        }

        // if we create a new post 
        else {
            const file = await service.uploadFile(data.featuredImage[0]);

            if (file) {
                const fileId = file.$id;
                data.FeaturedImage = fileId;
                const dbPost = await service.createPost({ ...data, userID: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(Blog)} className='flex lfex-wrap'>
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
                    label="featuredImage :"
                    type="file"
                    className="mb-4"
                    onChange={(e) => console.log(e.target.files) }
                    accept="featuredImage/png, featuredImage/jpg, featuredImage/jpeg, featuredImage/gif"
                    {...register("featuredImage", { required: !Blog })}
                />
                {Blog && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(Blog)}
                            alt={Blog.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["Active", "Inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={Blog ? "bg-green-500" : undefined} className="w-full">
                    {Blog ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default BlogForm