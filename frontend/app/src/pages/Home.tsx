import { useContext, useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Context } from '../context';
import { Product } from '../entities';
import SlideImage from '../components/SlideImage';


export default function Home() {
    const {addToCartHandler} = useContext(Context)
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/product').then(res => res.json()).then(data => {
            setProducts(data)
        });
    }, []);

    return (
        <div className='flex flex-col pt-10 max-h-screen overflow-auto'>
            <Container maxWidth="md">
                <Grid container spacing={4}>
                    {products && products.map((product: Product, index) => (
                    <Grid item key={index} md={4} sm={4} xs={12}>
                        <Card>
                            {product.images_path
                                ? <SlideImage imagesPath={product.images_path}/>
                                : <CardMedia
                                    className='h-[200x]'
                                    component="div"
                                    image="https://source.unsplash.com/random?wallpapers" />}
                            <CardContent>
                                <h3>{product['name']}</h3>
                                <p>{product['description']}</p>
                                <p className='text-cyan-700'>R$ {Number(product['price']).toFixed(2)}</p>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View</Button>
                                <Button onClick={(e) => {addToCartHandler(product)}} size="small">
                                    <ShoppingCart fontSize='small'/> Buy</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}