import { useState } from "react"
import { useCallback } from "react"

export default function useGetFetch() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getData = useCallback(async (url: string) => {
        try {
            setLoading(true)
            console.debug("Loaing is set to true")
            const response = await fetch(url)
            const data = await response.json()
            if (!response.ok) {
                if (data?.message) {
                    throw new Error(data.message)
                }
                throw new Error("Failed to fetch data")
            }
            setLoading(false)
            console.debug("Loaing is set to false")
            return data

        } catch (error: any) {
            console.error(error)
            setError(error.message)
            setLoading(false)
        }
    }, [])

    return { loading, error, setLoading, setError, getData }
}
