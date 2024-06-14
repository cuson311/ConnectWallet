import Link from 'next/link';
import Container from './container';
import Table from './table';
async function getData(id: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
   
const ViewServerDetailBlog = async ({ params }: { params: {id: string } }) => {  
    const data = await getData(params.id)
    return (
        <Container>
            <div className='my-3'>
                <Link href={'/server'}>Go Back</Link>
            </div>
            <Table bordered hover>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
                </thead>
                <tbody>
                    <tr key={params.id}>
                        <td>{data.userId}</td>
                        <td>{params.id}</td>
                        <td>{data.title}</td>
                        <td>{data.body}</td>
                    </tr>          
                </tbody>
            </Table>
            {/* <Card className="text-center">
                <Card.Header>Title: {data.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {data.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">Author: {data.author}</Card.Footer>
            </Card> */}
        </Container>
    )
}

export default ViewServerDetailBlog;