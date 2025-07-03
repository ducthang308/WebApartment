import React from 'react'
import Navbar from "./Navbar/navbar.tsx"
import Listing from "./ListingPage/listing.tsx"
import HeaderListing from './HeaderManagement/HeaderListing/headerListing.tsx'
import HeaderList from './HeaderManagement/HeaderList/headerListing.tsx'
import ListPost from './ListPostPage/ListPost.tsx'
import "./index.css"

const managementPage = () => {
    return (
        <div className="container-management">
            <Navbar></Navbar>
            <div className="management-content">
                <HeaderList></HeaderList>
                <ListPost></ListPost>
            </div>
        </div>
    )
}

export default managementPage