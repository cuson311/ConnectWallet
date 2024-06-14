'use client'

import ClientTable from '../components/clienttable';
import useSWR from 'swr';

const ClientPage = () => {
    
    const fetcher = (url: string) => fetch(url)
    .then((res) => res.json());
  
    const { data, error, isLoading } = useSWR(
      "https://jsonplaceholder.typicode.com/posts",
      fetcher,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      }
    );
  
    if(isLoading) {
      return <div>loading...</div>
    }
  
    return (
        <div className='mt-3'>
            <ClientTable 
            blogs = {data}/>
        </div>
    )
}

export default ClientPage;