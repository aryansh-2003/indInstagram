import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import appwriteService from "../../appwrite/config.js";
import {Input, RTE, Select} from '../../components'

export default function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const [loading, setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState(
        post ? appwriteService.getFilePreiview(post.featuredImage) : null
    )

    const submit = async (data) => {
        setLoading(true)
        try {
            if(post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
                
                if (file) appwriteService.deleteFile(post.featuredImage)

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })

                if(dbPost) navigate(`/post/${dbPost.$id}`)
            } else {
                if (!data.image[0]) {
                    alert('Please select an image to upload')
                    return
                }
                
                const file = await appwriteService.uploadFile(data.image[0])

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createDocument({
                        ...data,
                        userId: userData.$id
                    })

                    if(dbPost) navigate(`/post/${dbPost.$id}`)
                }
            }
        } catch (error) {
            console.log('Error submitting post:', error)
        } finally {
            setLoading(false)
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    if (userData === undefined) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
                <label className="block">
                    <span className="text-sm font-medium text-white mb-2 block">Photo</span>
                    <div className="relative">
                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full max-h-96 object-cover rounded-lg border-2 border-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null)
                                        setValue("image", null)
                                    }}
                                    className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-90 transition-opacity"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-gray-600 transition-colors bg-gray-900">
                                <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="mt-4">
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <span className="mt-2 block text-sm font-medium text-white">
                                            Drag photos here
                                        </span>
                                        <span className="mt-1 block text-sm text-gray-400">
                                            or click to browse
                                        </span>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            className="sr-only"
                                            accept="image/png, image/jpg, image/jpeg, image/gif"
                                            {...register("image", { required: !post })}
                                            onChange={(e) => {
                                                register("image").onChange(e)
                                                handleImageChange(e)
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </label>
            </div>

            {/* Caption */}
            <div>
                <Input
                    label="Caption"
                    placeholder="Write a caption..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-white placeholder-gray-400"
                    {...register("title", { required: true })}
                />
            </div>

            {/* Location */}
            <div>
                <Input
                    label="Location"
                    placeholder="Add location"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    {...register("location")}
                />
            </div>

            {/* Advanced Options - Collapsible */}
            <details className="group">
                <summary className="cursor-pointer text-gray-400 hover:text-white font-medium py-2 border-t border-gray-800">
                    Advanced Options
                    <span className="float-right group-open:rotate-180 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </summary>
                
                <div className="mt-4 space-y-4 pl-4">
                    <div>
                        <Input
                            label="Slug"
                            placeholder="post-slug"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-400"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Description
                        </label>
                        <RTE 
                            name="content" 
                            control={control} 
                            defaultValue={getValues("content")} 
                        />
                    </div>

                    <div>
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                            {...register("status", { required: true })}
                        />
                    </div>
                </div>
            </details>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-800">
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="px-6 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-8 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors ${
                        loading 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black'
                    }`}
                >
                    {loading ? 'Sharing...' : (post ? "Update" : "Share")}
                </button>
            </div>
        </form>
    )
}