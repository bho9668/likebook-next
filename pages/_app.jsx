import '../styles/globals.css'
import 'antd/dist/antd.css';

import React from 'react'
import useSWR from 'swr';
import useUser from '../lib/useUser'

import MainLayout from '../components/MainLayout';

const fetcher = (...args) => fetch(...args).then(res => res.json());

function MyApp({ Component, pageProps }) {

  const { error: meError, data: meData } = useSWR(`/api/auth/whoami`, fetcher);

  /* const { user } = useUser({ redirectTo: 'http://localhost:3000/auth/login' }) */

  return(
    <MainLayout>
      <Component {...pageProps} me={meData?.data}/>
    </MainLayout>
  )
}

export default MyApp
