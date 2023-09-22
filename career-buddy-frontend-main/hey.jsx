import JobBoard from "../../../../components/job-posting/JobBoard";
import React, { useState, useEffect } from 'react';
import {jobs} from "../../../../utils/data"
import JobInstance from "../../../../components/job-posting/add-post/JobInstance"
import Axios from 'axios';
import {baseURL} from "../../../../utils/data"

const Opportunities = () => {
  // declaring Important states
  const [loader, setLoader] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [allJobs, setAllJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [header, setHeader] = useState("Add Post");

  // all posts important information
  const [postInfo, setPostInfo] = useState({
    title: "",
    organization: "",
    location: "",
    deadline: "",
    description: "",
    site: "",
    logo: "",
  })

  const [uploaded, setUploaded] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`${baseURL}/posts`);
        setAllJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []);

  // this hides the modal
  const hideModal = () => {
    setShowModal(false)
  }

  // this adds a post
  const addPost = () => {
    setShowModal(true)
    setHeader("Add Post")
    setPostInfo(postInfo)
  }

  // convert from blob to readerble url
  const blobToDataURL = async (blob) => {
    const reader = new FileReader();
    return await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
  // this edits an existing post
  const handleEditClick = (id) => {
    setHeader("Edit Post")
    setShowModal(true)
    setPostInfo(selectedJob)
  }
  // this selects a desired job
  const handleJobClick = (jobListing) => {
    setSelectedJob(jobListing);

    if (jobListing.logo) {
      const url = blobToDataURL(postInfo.logo)
      setSelectedJob({...jobListing, logo: url})
    }
  }

  // this deletes an existing post
  const handleDeleteClick = (id) => {
    if (confirm("Are you sure you want to delete this job listing?")) {
      Axios.post(`${baseURL}/post/delete/${id}`)
        .then((response) => {
          // Handle successful deletion
        })
        .catch((error) => {
          // Handle error
        });
        setAllJobs(allJobs.filter(listing => listing.postID !== id));
        setSelectedJob(null);
    }
  }

  const getPostInformation = (event) => {
    if (event.target.id == "logo") {
      setUploaded(event.target.files[0])
      setPostInfo({...postInfo, [event.target.id] :URL.createObjectURL(event.target.files[0])})

    } else {
      setPostInfo({...postInfo, [event.target.id] :event.target.value})
    }
  }

  // This either adds a post or delete one
  const finalizePost = () => {
    // set up the loader
    console.log(postInfo)
    setLoader(true)

    // This adds a new post
    if (header == "Add Post") {
      setTimeout(() => {
        setAllJobs([postInfo, ...allJobs])
        setLoader(false)
      }, 2000)
      setTimeout(() => {
        alert("Post Added Successful!")
      }, 3500)
      
      // This edits a post
    } else {
      // alert(selectedJob.postID)
      const formData = new FormData();

      console.log(postInfo)
      for (const property in postInfo) {
        if (postInfo.hasOwnProperty(property)) {
          if (property !== "logo") {
            formData.append(property, postInfo[property]);
          }
        }
      }

      formData.append("logo", uploaded);
      formData.append("_method", "PUT");
      
      Axios.post(`${baseURL}/edit-post/${selectedJob.postID}`, formData).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      });
      // const updatedJobs = allJobs.map((job) => {
      // if (job.postID == selectedJob.postID) {
      //   setSelectedJob(postInfo)
      //   return {
      //     ...postInfo
      //   };
      // } else {
      //   return job;
      //   }
      // });
    
      // setTimeout(() => {
      //   setAllJobs(updatedJobs);
      //   setLoader(false)
      // }, 2000)
      // setTimeout(() => alert("Post Update Successful!"), 3500)
    }
    setTimeout(() => {
      setShowModal(false)
    }, 2000)
  }

  return (
  <div >
    <JobBoard 
      jobListings={allJobs} 
      addPost = {addPost}
      handleEditClick = {handleEditClick}
      selectedJob = {selectedJob}
      handleJobClick = {handleJobClick}
      handleDeleteClick = {handleDeleteClick}/>

    <JobInstance 
      loading = {loader} 
      hideModal = {hideModal} 
      showModal = {showModal}
      header = {header}
      getPostInformation = {getPostInformation}
      title = {postInfo.title}
      organization = {postInfo.organization}
      location = {postInfo.location}
      deadline = {postInfo.deadline}
      description = {postInfo.description}
      // attachment = {postInfo.logo}
      link = {postInfo.site}
      finalizePost = {finalizePost}
      />
  </div>);
  };

export default Opportunities;


    //  const newAvailabilities = availabilities.filter((date) => {
    //     const [dateStr, times] = Object.entries(date)[0];
    //       const filteredTimes = times.filter((time) => {
    //         return time.availabilityID !== availabilityID});
    //       return filteredTimes.length > 0 ? [date, filteredTimes] : false;
    //     })
  