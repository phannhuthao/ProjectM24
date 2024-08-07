import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { formatDate, formatUSD } from '../../confirg'

const Products = () => {
    return (
        <div>
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
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td><img src="" alt="" style={{width: "100", height: "100", objectFit: "cover"}}></img></td>
                        <td>{formatUSD.format(2000)}</td>
                        <td>
                            {formatDate("2022-10-10")}
                        </td>
                        <td><Button variant='warning'></Button></td>
                        <td><Button variant='danger'></Button></td>

                    </tr>
                
                </tbody>
            </Table>
        </div>
    )
}

export default Products
