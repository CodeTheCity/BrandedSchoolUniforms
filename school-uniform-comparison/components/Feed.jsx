"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("https://raw.githubusercontent.com/CodeTheCity/BrandedSchoolUniforms/scraper/data/sample.json");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [allPosts]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    
    console.log(allPosts.filter(
      (item) =>
        regex.test(item.school)
    ))

    setAllPosts(allPosts.filter(
      (item) =>
        regex.test(item.school)
    ))
    
    return allPosts.filter(
      (item) =>
        regex.test(item.school)
    );

  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
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
        {allPosts.map((post, index) => (
          <div key={index} className="bg-amber-100 rounded-lg flex flex-col items-center p-4" style={{backgroundColor: 'rgba(255,223,155,0.5)'}}>
            <img src={post.logo}/>
            <p>{post.school}</p>
          </div>
        ))}
      </div>

      {/* All Prompts */}
      {/* {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )} */}
    </section>
  );
};

export default Feed;
