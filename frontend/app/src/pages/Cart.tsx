import React, { useContext } from 'react';
import { Button, Container } from '@mui/material';
import { Product } from '../entities';
import { Context } from '../context';
import { Delete } from '@mui/icons-material';


export default function Cart() {
    const {cart, confirmPurchase, deleteHandler} = useContext(Context)

    const total = cart.reduce((prev: number, curr: Product) => {return prev + (curr.price*curr.quantity)}, 0).toFixed(2)

    return (
        <div>
            <Container maxWidth="md">
                <div className='flex flex-row justify-between space-x-2'>
                    <div className='flex flex-col w-3/5'>
                        <h2>Cart</h2>
                        <p>Here you can see your cart</p>
                        <div className='p-2 border-solid rounded border-2 border-gray-200'>
                            {cart.map((product: Product, index: number) => (
                                <div key={index} className='flex flex-row justify-between p-2'>
                                    <div className='w-52 h-28 border-solid border-2 rounded'>
                                        <img className='w-full h-full object-cover'
                                            src="https://source.unsplash.com/random?wallpapers" alt="random"/>
                                    </div>
                                    <div className='flex flex-col w-full h-full items-center'>
                                        <p>
                                            <span className='cursor-pointer' onClick={(e)=>{deleteHandler(product)}}>
                                                <Delete fontSize='small' color='error' />
                                            </span>
                                            {product['name']}
                                        </p>
                                        <p>R$ {Number(product['price']).toFixed(2)}</p>
                                        <p>Price {Number(
                                            product['price']/(1+(product['productType']?.['percentage_tax']??0)/100)
                                            ).toFixed(2)} + tax
                                            {product['productType']?.['percentage_tax']}%</p>
                                        <p>Quantity {product['quantity']} - R${product['price']*product['quantity']}</p>
                                    </div>
                                </div>))}
                        </div>
                    </div>
                    <div className='flex flex-col w-2/5 text-center'>
                        <h2>Checkout</h2>
                        <p>Confirm the values</p>
                        <div className='p-4 border-solid rounded border-2 border-gray-200'>
                            <p>Full Value R${total}</p>
                        <Button onClick={(e)=>confirmPurchase(total)} disabled={total <= 0} variant="contained" color="success">Buy</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}