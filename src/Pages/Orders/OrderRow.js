import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, customer, email, serviceName, price, message, service, status } = order;
    const [orderService, setOrderService] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
    }, [service])

   
    return (
        <tr>
            <th>
                <label>
                    <button onClick={()=> handleDelete(_id)} className='btn btn-error'>X</button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {
                                orderService?.img &&
                                <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{email}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">${price}</span>
            </td>
            <td>{message}</td>
            <th>
                <button onClick={()=>handleStatusUpdate(_id)} className="btn btn-ghost btn-xs">
                    {status ? status : 'Pending'}
                </button>
            </th>
        </tr>
    );
};

export default OrderRow;