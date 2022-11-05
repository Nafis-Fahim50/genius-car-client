import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user, logout} = useContext(AuthContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://genius-car-server-iota-murex.vercel.app/orders?email=${user?.email}`,{
            headers:{
                authorization : `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                if(res.status === 401 || res.status === 403){
                    return logout();
                }
                return res.json()
            })
            .then(data => {
                // console.log(data);
                setOrders(data)
            })
    }, [user?.email, logout])

    const handleDelete = id => {
        const processed = window.confirm('Are you sure to delete this item?');
        if(processed){
            fetch(`https://genius-car-server-iota-murex.vercel.app/orders/${id}`,{
                method:'DELETE'
            })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount>0){
                toast.success('Successfully deleted item');
                const remaining = orders.filter(odr => odr._id !== id);
                setOrders(remaining);
            }
        })
        }
    }

    const handleStatusUpdate = id =>{
        fetch(`https://genius-car-server-iota-murex.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'Approved'})
        })
        .then(res => (res.json()))
        .then(data =>{
            console.log(data);
            if(data.modifiedCount > 0) {
                const remaining = orders.filter(odr => odr._id !== id);
                const approving = orders.find(odr => odr._id === id);
                approving.status = 'Approved'

                const newOrders = [approving, ...remaining];
                setOrders(newOrders);
            }
        })
    }

    return (
        <div className='mt-20'>
            <h2 className="text-2xl mb-5">You have {orders.length} Orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Product</th>
                            <th>Message</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}></OrderRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;