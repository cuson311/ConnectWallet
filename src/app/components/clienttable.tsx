'use client'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
interface IProps {
    blogs: IBlog[];
}
const ClientTable = (props: IProps) => {
    const {blogs} = props;
    return (
        <Container>
            <div className='mb-3' style={{display: 'flex', justifyContent:'space-between'}}>
                <h3>Client Table</h3>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>No</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {blogs.map(item => {
                        return (
                        <tr key={item.id}>
                            <td>{item.userId}</td>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.body}</td>
                            <td>
                                <Link className='btn btn-primary' href={`/client/${item.id}`}>View</Link>
                            </td>
                        </tr>
                        )
                    })}
                
                </tbody>
            </Table>
        </Container>        
    )
}

export default ClientTable;