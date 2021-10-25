import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export const useUser = (userId) => {
  const { data, error } = useSWR(`/api/users/${userId}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

const useAuth = () => {

}