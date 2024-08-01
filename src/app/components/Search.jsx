import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const flattenPages = (pages) => {
  const flattenedPages = [];
  pages.forEach((page) => {
    flattenedPages.push(page);
    if (page.subItems && page.subItems.length > 0) {
      page.subItems.forEach((subPage) => {
        flattenedPages.push(subPage);
      });
    }
  });
  return flattenedPages;
};

const SearchBar = () => {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const searchBoxRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Close suggestions if clicked outside the search box or suggestion box
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target) &&
        !event.target.classList.contains('suggestion-item')
      ) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const pages = [
    {
      title: "Company Analytics",
      path: "/pbr/company_analytic/performance",
      links: "performance",

      subItems: [
        {
          title: "Performance and Ranking",
          path: "/pbr/company_analytic/performance",
          links: "performance",
        },
        {
          title: "Company Brand",
          path: "/pbr/company_analytic/company_brand",
          links: "company_brand",
        },
        {
          title: "Company Sku",
          path: "/pbr/company_analytic/sku",
          links: "sku",
        },
      ],
    },
    {
      title: "Therapy Area Analytics",
      path: "/pbr/therapy/market",
      links: "market",

      subItems: [
        {
          title: "Market Overview",
          path: "/pbr/therapy/market",
        },
        {
          title: "Therapy Area",
          path: "/pbr/therapy/therapy", 
        },
        {
          title: "Market Size Model",
          path: "/pbr/therapy/market-Modal",
        },
      ],
    },
    {
      title: "Brand Analytics",
      path: "/pbr/brand/brand_share",

      subItems: [
        {
          title: "Brand Share Analytics",
          path: "/pbr/brand/brand_share",
          links: "sku",
        },
        {
          title: "Brank SKU",
          path: "/pbr/brand/brand_sku",

          links: "sku",
        },
        {
          title: "Competitive Analysis",
          path: "/pbr/brand/competitive",

          links: "sku",
        },
        {
          title: "Patient Uptake",
          path: "/pbr/brand/patient",

          links: "sku",
        },
        {
          title: "Co-prescription Analysis",
          path: "/pbr/brand/prescription", 

          links: "sku",
        },
      ],
    },
    {
      title: "Channel Analytics",
      path: "/pbr/channel/numeric",

      subItems: [
        {
          title: "Numeric Selling Distribution",
          path: "/pbr/channel/numeric",

          links: "sku",
        },
       
        {
          title: "Weighted Selling Distribution",
          path: "/pbr/channel/weighted",

          links: "sku",
        },
      ],
    },
    
  ];

  const flattenedPages = flattenPages(pages);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Update search results based on the query
    const filteredResults = flattenedPages.filter((page) =>
      page.title.toLowerCase().includes(newQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
    setIsSuggestionsOpen(filteredResults.length > 0); // Open suggestions if there are results
  };

  const handleSearch = () => {
    if (searchResults.length > 0) {
      const selectedPage = searchResults[0];
      router.push(selectedPage.path);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full flex items-center">
        <input
          type="text"
          placeholder="Search Dashboards"
          value={query}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-8 pr-3 py-3 w-[80%] rounded-lg border focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          ref={searchBoxRef}
        />
        <svg
          onClick={handleSearch}
          className="cursor-pointer absolute w-5 h-5 text-gray-500 left-2 top-2.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.873-4.873M8 15a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
      </div>

      {/* Display search suggestions */}
      {isSuggestionsOpen && searchResults.length > 0 && (
        <ul className="absolute z-50 mt-2 w-96 bg-white border rounded-md shadow-lg top-12">
          {searchResults.map((result) => (
            <li
              key={result.title}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 suggestion-item"
              onClick={() => {
                router.push(result.path);
                setIsSuggestionsOpen(false); // Close suggestions after clicking a suggestion
              }}
            >
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
