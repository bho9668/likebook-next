import '../styles/globals.css'
import 'antd/dist/antd.css';

import React from 'react'
import useSWR from 'swr';

import MainLayout from '../components/MainLayout';

const fetcher = (...args) => fetch(...args).then(res => res.json());

function MyApp({ Component, pageProps }) {

  const { error: meError, data: meData } = useSWR(`/api/auth/whoami`, fetcher);

  return(
    <MainLayout>
      <Component {...pageProps} me={meData?.data}/>
    </MainLayout>
  )
}

export default MyApp
