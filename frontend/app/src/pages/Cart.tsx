import React, { useContext } from 'react';
import { Container } from '@mui/material';
import { Product } from '../entities';
import { Context } from '../context';


export default function Cart() {
    return (
        <div>
            <Container maxWidth="md">
                <div className='flex flex-row justify-between space-x-2'>
                    <div className='flex flex-col w-3/5'>
                        <h2>Cart</h2>
                        <p>Here you can see your cart</p>
                        <div className='p-2 border-solid rounded border-2 border-gray-200'>
                            {useContext(Context).cart.map((product: Product, index: number) => (
                                <div key={index} className='flex flex-row justify-between p-2'>
                                    <div className='w-52 h-28 border-solid border-2 rounded'>
                                        <img className='w-full h-full object-cover'
                                            src="https://source.unsplash.com/random?wallpapers" alt="random"/>
                                    </div>
                                    <div className='flex flex-col w-full h-full items-center'>
                                        <p>{product['name']}</p>
                                        <p>R$ {Number(product['price']).toFixed(2)}</p>
                                        <p>price {Number(
                                            product['price']/(1+(product['productType']?.['percentage_tax']??0)/100)
                                            ).toFixed(2)} + tax
                                            {product['productType']?.['percentage_tax']}%</p>
                                    </div>
                                </div>))}
                        </div>
                    </div>
                    <div className='flex flex-col w-2/5'>
                        <h2>Checkout</h2>
                        <p>Confirm the values</p>
                        <div className='p-4 border-solid rounded border-2 border-gray-200'>
                            values
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}