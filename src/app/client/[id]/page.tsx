'use client'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import useSWR, {Fetcher} from 'swr';
import Container from 'react-bootstrap/Container';
const ViewClientDetailBlog = ({ params }: { params: {id: string } }) => {

    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url)
    .then((res) => res.json());
  
    const { data, error, isLoading } = useSWR(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`,
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
        <Container>
            <div className='my-3'>
                <Link href={'/client'}>Go Back</Link>
            </div>
            <Card className="text-center">
                <Card.Header>Title: {data?.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {data?.body}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ViewClientDetailBlog;