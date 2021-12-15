import React from 'react'
import TableHeaders from '../components/layout/Table/TableHeaders'

//import classes from './AllOrders.css'

function Completed(props) {
    const { completedOrders, deleteOrder } = props;

    return (
        <div>
            <h3>COMPLETED ({completedOrders.length})</h3>
            <table id='dataTable'>
                <thead>
                    <tr>
                        <TableHeaders />
                    </tr>
                </thead>
                <tbody>
                    {completedOrders.map(order => {
                        return (
                            <tr key={order._id}>
                                <td>{order.customer}</td>
                                <td>{order.stylenumber}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{order.triageowner}</td>
                                <td>{order.owner}</td>
                                <td>{order.workload}</td>
                                <td>{order.buildtime}</td>
                                <td>{order.triagecomplete}</td>
                                <td>{order.designcomplete}</td>
                                <td>{order.duedate}</td>
                                <td><button disabled>COMPLETE</button></td>
                                <td><button disabled>COMPLETE</button></td>
                                <td><button onClick={() => deleteOrder(order)}>X</button></td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Completed
