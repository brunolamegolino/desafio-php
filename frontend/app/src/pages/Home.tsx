import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Product } from '../entities';
import { Context } from '../context';


export default function Home() {
    const {cart, setCart} = useContext(Context)
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/product').then(res => res.json()).then(data => {
            setProducts(data)
        });
    }, []);

    const buyingHandler = (product: Product) => {
        setCart((cart: Product[]) => [...cart, product])
    }

    return (
        <div>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {products && products.map((product, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                        <CardMedia
                            component="div"
                            sx={{
                            // 16:9
                            pt: '56.25%',
                            }}
                            image="https://source.unsplash.com/random?wallpapers"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <h3>{product['name']}</h3>
                            <p>{product['description']}</p>
                            <p className='text-cyan-700'>R$ {Number(product['price']).toFixed(2)}</p>
                        </CardContent>
                        <CardActions>
                            <Button size="small">View</Button>
                            <Button onClick={(e) => buyingHandler(product)} size="small"><ShoppingCart fontSize='small'/> Buy</Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}