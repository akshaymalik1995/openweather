import { useEffect, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import { BiSearch } from "react-icons/bi";
import getCitiesSuggestion from "../lib/getCitiesSuggestions";

// Main functional component for the search form
export default function SearchForm({
  setSearchParams,
}: {
  setSearchParams: any;
}) {
  // State variables for managing form inputs, suggestions, and UI states
  const [locationInput, setLocationInput] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<Object[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  // Event listener to close suggestions on document click outside the suggestions list
  useEffect(() => {
    document.addEventListener("click", closeSuggestions);

    return () => {
      document.removeEventListener("click", closeSuggestions);
    };
  }, []);

  // Handler for selecting a suggestion from the list
  async function onSuggestionSelection(city: string, countryCode: string) {
    setLocationInput("");
    setSearchParams({ city, countryCode });
  }

  // Handler for form submission
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!locationInput) return;
    onSuggestionSelection(locationInput, "");
  }

  // Handlers for opening and closing suggestions list
  function closeSuggestions() {
    setSuggestionsOpen(false);
  }

  function openSuggestions() {
    setSuggestionsOpen(true);
  }

  // Handler for input change to fetch and display suggestions
  async function handleInputChange(value: string) {
    setLocationInput(value);
    if (!value) {
      closeSuggestions();
      setCitySuggestions([]);
      return;
    }
    openSuggestions();
    const cities: Object[] = await getCitiesSuggestion(value);
    if (cities) {
      setCitySuggestions([...cities]);
    }
  }
  return (
    <div className="w-full my-8">
      {/* A Form to take user input - Location */}
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="flex w-full gap-4 "
        action=""
      >
        {/* A Text Input */}
        <div className="grow relative">
          <input
            value={locationInput}
            onChange={(e) => handleInputChange(e.target.value)}
            autoFocus={true}
            placeholder="Search City.."
            className="px-2 dark:bg-gray-800 dark:text-white rounded w-full py-2 shadow focus:outline-none "
            type="search"
          />
          <SuggestionsList
            isOpen={suggestionsOpen}
            onSuggestionSelection={onSuggestionSelection}
            suggestions={[...citySuggestions]}
          />
        </div>
        <button
          className="px-2 py-2 bg-blue-200 dark:bg-gray-700 dark:text-white text-blue-600 rounded"
          type="submit"
        >
          <div className="w-6 h-6 flex justify-center items-center ">
            <BiSearch />
          </div>
        </button>
      </form>
    </div>
  );
}
