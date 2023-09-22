import JobBoard from "../../../../components/job-posting/JobBoard";
import React, { useState, useEffect } from "react";
import { jobs } from "../../../../utils/data";
import JobInstance from "../../../../components/job-posting/add-post/JobInstance";
import Axios from "axios";
import { BASE_URL } from "../../../../network/api-endpoints";

const Opportunities = () => {
  // declaring Important states
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [header, setHeader] = useState("Add Post");

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Handle changing the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedJob(null);
  };

  // all posts important information
  const [postInfo, setPostInfo] = useState({
    title: "",
    organization: "",
    location: "",
    deadline: "",
    description: "",
    site: "",
    logo: null,
  });

  const [updated, setUpdated] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`${BASE_URL}posts`);
        setAllJobs(response.data);
        setFilteredPosts(response.data);
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
    setShowModal(false);
  };

  // this adds a post
  const addPost = () => {
    setShowModal(true);
    setHeader("Add Post");
    setPostInfo(postInfo);
  };

  // this edits an existing post
  const handleEditClick = (id) => {
    setHeader("Edit Post");
    setShowModal(true);
    setPostInfo(selectedJob);
  };
  // this selects a desired job
  const handleJobClick = (jobListing) => {
    setSelectedJob(jobListing);
  };

  // this deletes an existing post
  const handleDeleteClick = (id) => {
    if (confirm("Are you sure you want to delete this job listing?")) {
      Axios.post(`${BASE_URL}post/delete/${id}`)
        .then((response) => {
          // Handle successful deletion
        })
        .catch((error) => {
          // Handle error
        });
      setAllJobs(allJobs.filter((listing) => listing.postID !== id));
      setFilteredPosts(allJobs.filter((listing) => listing.postID !== id));
      setSelectedJob(null);
    }
  };

  const getPostInformation = (event) => {
    if (event.target.id == "logo") {
      if (header == "Edit Post") {
        setUpdated(true);
      }
      const file = event.target.files[0];
      console.log(file);
      setPostInfo({ ...postInfo, logo: file });
    } else {
      setPostInfo({ ...postInfo, [event.target.id]: event.target.value });
    }
  };

  // This either adds a post or delete one
  const finalizePost = () => {
    const formData = new FormData();
    for (const property in postInfo) {
      formData.append(property, postInfo[property]);
    }

    // set up the loader
    setLoader(true);

    // This adds a new post
    if (header == "Add Post") {
      Axios.post(`${BASE_URL}add-post`, formData)
        .then((response) => {
          // Fetch all the posts from the database
          const fetchData = async () => {
            try {
              const response = await Axios.get(`${BASE_URL}posts`);
              setTimeout(() => {
                setAllJobs(response.data);
                setFilteredPosts(response.data);
                setSelectedJob(response.data[0]);
                setLoader(false);
                setShowModal(false);
                setCurrentPage(1);
              }, 2000);
            } catch (error) {
              console.log(error);
            }
          };
          setTimeout(() => alert("Post Added Successful!"), 3000);

          fetchData();
          const timer = setTimeout(() => {
            fetchData();
          }, 1000);

          return () => clearTimeout(timer);
        })
        .catch((error) => {
          console.log(error);
        });

      // This edits a post
    } else {
      formData.delete("logo");
      if (updated) {
        formData.append("logo", postInfo.logo);
      }

      formData.append("_method", "PUT");
      Axios.post(`${BASE_URL}edit-post/${selectedJob.postID}`, formData).then(response => {
        // console.log(response.data);
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      });

      const fetchData = async () => {
        try {
          const response = await Axios.get(`${BASE_URL}posts`);
          const updatedJobs = response.data.map((job) => {
          if (job.postID == selectedJob.postID) {
              setSelectedJob(job) 
            }          
          setAllJobs(response.data); 
          setFilteredPosts(response.data)
        })
        
        } catch (error) {
          console.log(error);
        }
      };

      const timer = setTimeout(() => {
        fetchData();
      }, 1000);

      setTimeout(() => {
        setLoader(false);
      }, 2000);
      setTimeout(() => alert("Post Update Successful!"), 3500);
    }
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const searchPost = (event) => {
    setSearch(event.target.value);
    filterPosts(event.target.value);
    // Set a new timer
    const timer = setTimeout(() => {
      filterPosts(e.target.value);
    }, 1000);
    // Clear the previous timer if there is any
    clearTimeout(timer);
  };

  const filterPosts = (searchInput) => {
    if (searchInput == "") {
      setFilteredPosts(allJobs);
    }
    const filtered = allJobs.filter((post) => {
      // Filter by title
      if (post.title.toLowerCase().includes(searchInput.toLowerCase())) {
        return true;
      }
      // Filter by location
      if (post.location.toLowerCase().includes(searchInput.toLowerCase())) {
        return true;
      }
      // Filter by organization
      if (post.organization.toLowerCase().includes(searchInput.toLowerCase())) {
        return true;
      }
      // Filter by deadline
      if (post.deadline.toLowerCase().includes(searchInput.toLowerCase())) {
        return true;
      }
      // Filter by description
      if (post.description.toLowerCase().includes(searchInput.toLowerCase())) {
        return true;
      }
      return false;
    });
    setFilteredPosts(filtered);
  };

  return (
    <div>
      <JobBoard
        jobListings={filteredPosts}
        addPost={addPost}
        handleEditClick={handleEditClick}
        selectedJob={selectedJob}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        search={search}
        initializer={setSelectedJob}
        searchPost={searchPost}
        handleJobClick={handleJobClick}
        handleDeleteClick={handleDeleteClick}
      />

      <JobInstance
        loading={loader}
        hideModal={hideModal}
        showModal={showModal}
        header={header}
        getPostInformation={getPostInformation}
        title={postInfo.title}
        organization={postInfo.organization}
        location={postInfo.location}
        deadline={postInfo.deadline}
        description={postInfo.description}
        attachment={postInfo.logo}
        link={postInfo.site}
        finalizePost={finalizePost}
      />
    </div>
  );
};

export default Opportunities;
