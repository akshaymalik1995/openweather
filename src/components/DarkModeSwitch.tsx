import { FiSun } from "react-icons/fi";
import { IoMdMoon } from "react-icons/io";

export default function DarkModeSwitch({ darkModeOn, toggleDarkMode }: any) {
  return (
    <div
      onClick={() => toggleDarkMode()}
      className="bg-blue-50 dark:text-white dark:bg-gray-800  p-2 cursor-pointer rounded "
    >
      {darkModeOn ? <FiSun /> : <IoMdMoon />}
    </div>
  );
}
