import {useEffect, useMemo, useState} from "react";

export const useQuery = (url: string, params?: Record<string, string>) => {
  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const fetchInput = useMemo(() => `${url}?${new URLSearchParams(params)}`, [url, params])
  useEffect(function fetchData() {
    setIsLoading(true);
    setError(undefined);
    fetch(fetchInput)
      .then((response) => {
        if (response.status >= 400) {
          response.json().then((data) => setError(data?.errorMessage ?? data?.message))
          return Promise.reject()
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData)
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
        setError((oldError) => oldError ?? 'Unknown error')
      })
  }, [fetchInput])

  return {data, isLoading, error}
}