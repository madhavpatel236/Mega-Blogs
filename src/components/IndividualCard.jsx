// This component is use for the card for example like we have total 10 blogs then we can use this componenet for the each blog card.

import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function IndividualCard({ $id, title, FeaturedImage }) {
    return (
        <Link
            to={`/post/${$id}`}>
            <div className='w-full bg-gray-200 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img
                        src={service.getFilePreview(FeaturedImage)}
                        alt={title}
                        className='rounded-xl' />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default IndividualCard