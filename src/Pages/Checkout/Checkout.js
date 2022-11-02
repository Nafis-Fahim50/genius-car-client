import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Checkout = () => {
    const services = useLoaderData();
    const { title, price, _id } = services;
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = event =>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`
        const email = user?.email || 'unregistered'
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName : title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('http://localhost:5000/orders',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.acknowledged){
                toast.success('Successfully place your order')
                form.reset();
            }
        })
        .catch(err => console.error(err));
    }

 

    return (
        <div className='mt-5'>
            <h1 className='text-4xl mb-2 font-bold text-rose-500 text-center'>Checkout</h1>
                <div className='mb-7 text-center'>
                    <h2><span className='font-semibold'>You are about to order: </span>{title}</h2>
                    <h4><span className='font-semibold'>Price: </span>${price}</h4>
                </div>
            <form onSubmit={handlePlaceOrder} className='bg-zinc-200 rounded-lg mb-10'>
                <div className='rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6  p-12'>
                    <input type="text" name='firstName' placeholder="First Name" className="input input-bordered input-white w-full" />
                    <input type="text" name='lastName' placeholder="Last Name" className="input input-bordered input-white w-full" />
                    <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered input-white w-full" />
                    <input type="email" name='email' placeholder="Email" defaultValue={user?.email} className="input input-bordered input-white w-full" readOnly />
                </div>
                <textarea className="textarea textarea-bordered rounded-lg w-3/4 ml-32 h-44 mb-6" name='message' placeholder="Write your message"></textarea>
                <br />
                <input className='btn btn-primary mb-5 w-full' type="submit" value="Place Your Order" />
            </form>

        </div>
    );
};

export default Checkout;