import { CiSearch } from "react-icons/ci";

export default function SuggestionsList(props: {
  suggestions: Object[];
  onSuggestionSelection: (city: string, countryCode : string) => void;
  isOpen: Boolean;
}) {



  return (
    <div
      className={`shadow ${
        props.isOpen ? "" : "hidden"
      } bg-white z-10 flex dark:bg-gray-800 dark:text-white rounded flex-col w-full absolute top-full`}
    >
      {props.suggestions.length > 0 &&
        props.suggestions.map((city : any) => (
          <div
            key={city.code}
            onClick={() => props.onSuggestionSelection(city.name, city.country.code)}
            className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700  cursor-pointer  flex items-center gap-2"
          >
            <div className="text-lg text-gray-500 dark:text-gray-300  ">
              <CiSearch />
            </div>
            <div className="text-gray-700 dark:text-gray-100 ">
              {city.name}, {city.country.name}
            </div>
          </div>
        ))}
    </div>
  );
}
