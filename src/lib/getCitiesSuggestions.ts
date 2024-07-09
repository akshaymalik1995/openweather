// Function to asynchronously fetch city suggestions based on user input
export default async function getCitiesSuggestion(value: string) {
    try {
        // Constructing the URL for the API call with encoded search value
        const url = `https://api.thecompaniesapi.com/v1/locations/cities?search=${encodeURIComponent(
            value
        )}&size=5`;

        // Fetching data from the API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to get cities" + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        return data.cities;
    } catch (error) {
        console.error(error);
        return [];
    }
}