import React, { useState } from 'react';
import './JobBoard.scss';
import useAuth from '../../hooks/useAuth'

const JobBoard = ({ jobListings, addPost, currentPage,handlePageChange, handleEditClick, handleDeleteClick, selectedJob, handleJobClick, searchPost, search}) => {
  //declaring the global state
  const {auth} = useAuth();
  // alert(auth.roles[0])
  // states for pagination
  const [postsPerPage, setPostsPerPage] = useState(6);

   // Calculate the index of the last post to display
   const lastPostIndex = currentPage * postsPerPage;
   // Calculate the index of the first post to display
   const firstPostIndex = lastPostIndex - postsPerPage;
   // Get the current page's posts
   const currentPosts = jobListings.slice(firstPostIndex, lastPostIndex);
 
   // Calculate the total number of pages
   const totalPages = Math.ceil(jobListings.length / postsPerPage);
 
   // Generate an array of page numbers
   const pageNumbers = [];
   for (let i = 1; i <= totalPages; i++) {
     pageNumbers.push(i);
   }

  return (
    <div className='job-main'>
      <div className="job-header">
      {auth.roles[0] == "admin" ?(
        <span>Career Opportunities Management</span>
          
        ) : (
          <span>Career Opportunities Postings</span>
        )}
        <input type="text" className='search-post' placeholder='search post ...' onChange={searchPost} value = {search}/>
        {auth.roles[0] == "admin" && (
          <button onClick={addPost}>Add Opportunity</button>
        )}
      </div>

      <div className="job-board">
        <div className="job-listings">
          <span className="job-listings-title">Listings</span>
          <div className='job-listings-1'>
            {currentPosts.map((jobListing, index) => (
              <div className={`job-listing${selectedJob === jobListing ? ' active' : ''}`} key={index} onClick={() => handleJobClick(jobListing)}>
                <h3 className="job-title">{jobListing.title}</h3>
                <h4 className="company-name">{jobListing.organization}</h4>
                <p className="location">{jobListing.location}</p>
              </div>
            ))}

          </div>
        </div>
        <div className="job-details">
          <span className="job-details-title">Listing Details</span>
          {selectedJob ? (
            <div className="job-detail">
              <div className='header-actions'>
                <h3 className="job-title-detail">{selectedJob.title}</h3>
                {auth.roles[0] == "admin" && (
                  <div id='actions'>
                    <button className="action edit" onClick={() => handleEditClick(selectedJob.postID)}>Edit</button>
                    <button className="action delete" onClick={() => handleDeleteClick(selectedJob.postID)}>Delete</button>
                  </div>
                )}
              </div>
              
                <div className='deadliner'>
                  <span className="company-name-detail">{selectedJob.organization}</span>
                  {selectedJob.deadline && ( 
                    <h3 id='dead' className="company-name">{`Deadline: ${selectedJob.deadline}`}</h3>
                  )}
                </div>
              <p className="location-details">{selectedJob.location}</p>
              {selectedJob.logo && (
                <div className='embeded-file'>
                  <embed  src={`${selectedJob.logo}?${new Date().getTime()}`} className = "embeded"/>
                </div>
              )}
              <p className="description">{selectedJob.description}</p>
              <a href= {selectedJob.site} target="_blank" id='explore'> Learn More</a>
            </div>
          ) : (
            <div className="job-detail">
              <p className="no-job-selected">Please select a job listing to view details.</p>
            </div>
          )}
        </div>
      </div>

      <div className='paginator'>
        {pageNumbers.map((pageNumber) => (
          <button key={pageNumber} 
            className={currentPage === pageNumber ? "current-page" : ""}
            onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
    
  );
}

export default JobBoard;
