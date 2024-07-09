/**
 * Calculates and returns the current time in a specified city based on its timezone offset.
 *
 * @param tzOffsetInSec The timezone offset in seconds for the city whose time we want to calculate.
 * @returns A string representation of the current time in the specified city.
 */
export default function getCityTime(tzOffsetInSec: number): string {
    // Get the current date and time
    const date = new Date();
    // Convert the current time to milliseconds since the Unix Epoch
    const timeInMs = date.getTime();
    // Convert the provided timezone offset from seconds to milliseconds
    const tzOffsetInMs = tzOffsetInSec * 1000;
    // Calculate the timezone offset in milliseconds for the local system
    const localTzOffsetInMs = date.getTimezoneOffset() * 60000;
    // Add the calculated offsets to the current time to get the time in the target city
    const cityDate = new Date(timeInMs + tzOffsetInMs + localTzOffsetInMs);
    // Format and return the time as a localized string
    const time_str = cityDate.toLocaleString().split(", ")[1];
    const am_pm = time_str.split(" ")[1];
    const time = time_str.split(" ")[0];
    const [hours, minutes, seconds] = time.split(":");
    console.log(hours, minutes, seconds);
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")} ${am_pm}`
    // return cityDate.toLocaleString();
}