import { useEffect } from 'react'
import { Button, Spinner, Table } from 'react-bootstrap'
import { formatDate, formatUSD } from '../../confirg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProduct } from '../../store/slice/productSlice';
import { RootState } from '../../store';


export default function Products()  {
    const dispatch = useDispatch();
    // lấy dữ liệu từ store

    const { products, isLoading }= useSelector((state: RootState) => state.product);

    useEffect(()=> {
        dispatch(fetchAllProduct)
    })
    return (
        <div>
            {isLoading && <Spinner animation='border' variant='danger' />}
            <h1>Trang quản lí sản phẩm</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Created At</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((p: any, index: any) =>
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{p.name}</td>
                        <td><img src={p.image} alt={p.name} style={{width: "100", height: "100", objectFit: "cover"}}></img></td>
                        <td>{formatUSD.format(p.price)}</td>
                        <td>
                            {formatDate(p.createdAd)}
                        </td>
                        <td><Button variant='warning'>Sửa</Button></td>
                        <td><Button variant='danger'>Xóa</Button></td>
                    </tr>
                         )
                    }
                
                </tbody>
            </Table>
        </div>
    )
}


