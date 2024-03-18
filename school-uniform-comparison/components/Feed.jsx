"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null); // Track selected school

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/CodeTheCity/BrandedSchoolUniforms/main/price_match_directory.json");
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
    return allPosts.filter((item) => regex.test(item.school_name));
  };

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    setSearchedResults(filterPrompts(tagName));
  };

  const openModal = (post) => {
    setSelectedSchool(post); // Set selected school
  };

  const closeModal = () => {
    setSelectedSchool(null); // Deselect school when closing modal
  };

  return (
    <section className='w-full flex flex-col items-center mt-5'>
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

      <div className="w-full mt-10 flex flex-wrap gap-x-5 gap-y-5 ">
        {searchedResults.map((post, index) => (
          <div key={index} className="bg-amber-100 rounded-lg flex flex-col items-center p-4 w-50 h-50" style={{backgroundColor: 'rgba(255,223,155,0.5)'}} onClick={() => openModal(post)}>
            <img width="100px" height="100px" src={post.school_logo} alt={`Logo of ${post.school_name}`} />
            <p className="text-xs">{post.school_name}</p>
          </div>
        ))}
      </div>
      {selectedSchool && ( // Render modal only if a school is selected
        <div className="mx-auto fixed z-10 inset-0 inset-x-0 top-10 overflow-y-auto w-3/5 rounded-xl">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg p-8">
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center">
                <img width="200px" height="200px" src={selectedSchool.school_logo} alt={`Logo of ${selectedSchool.school_name}`} />
                <h1 className="text-lg font-bold mb-4">{selectedSchool.school_name}</h1>
                  {selectedSchool.product_list.map((product, index) => (
                    <div className="grid grid-cols-3 gap-4 mb-2">
                      <div key={index} className="bg-gray-100 p-4 rounded-md">
                        <img
                          src={product.closest_product_img_src}
                          alt={`Image of ${product.product_name}`}
                          className="w-full h-auto"
                        />
                        <h2 className="text-lg font-bold">{product.product_name}</h2>
                        <p className="text-gray-700">Price: £{product.product_price}</p>
                      </div>
                      <div key={index} className="bg-gray-100 p-4 rounded-md">
                        <img
                          src={product.closest_product_img_src}
                          alt={`Image of ${product.closest_product_name}`}
                          className="w-full h-auto"
                        />
                        <h2 className="text-lg font-bold">ASDA {product.closest_product_name}</h2>
                        <p className="text-gray-700">Price: £{product.closest_product_price}</p>
                      </div>
                      <div className="flex flex-col items-center justify-items-center">
                        <p className="text-red-500" style={{fontSize: 100}}>{Math.round(product.price_difference)}%</p>
                        <p>More expensive</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>

  );
};

export default Feed;