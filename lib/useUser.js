import React, { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const useUser = ({ 
  redirectTo = false,
  redirectIfFound =false,
} = {}) => {  
  
  const { data: user, mutate: mutateUser } = useSWR('/api/auth/whoami', fetcher);

  useEffect(() => {
    if (!redirectTo || !user) return;

    if ((redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
        (redirectIfFound && user?.isLoggedIn)) {
          Router.push(redirectTo);
        }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutate: mutateUser };
};

export default useUser;