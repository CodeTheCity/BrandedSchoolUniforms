"use client";

import { useState, useEffect } from "react";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/CodeTheCity/BrandedSchoolUniforms/scraper/data/sample.json");
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setSearchedResults(filterPrompts(searchText));
  }, [searchText, allPosts]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter((item) => regex.test(item.school));
  };

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    setSearchedResults(filterPrompts(tagName));
  };

  return (
    <section className='w-full flex flex-col items-center'>
      <form className='relative w-2/3 flex-center'>
        <input
          type='text'
          placeholder='Search for a school'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <div className="w-full mt-10 flex flex-row gap-x-5">
        {searchedResults.map((post, index) => (
          <div key={index} className="bg-amber-100 rounded-lg flex flex-col items-center p-4" style={{backgroundColor: 'rgba(255,223,155,0.5)'}}>
            <img src={post.logo} alt={`Logo of ${post.school}`} />
            <p>{post.school}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feed;