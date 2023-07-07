import React, { useContext } from 'react';
import { AppBar, Badge, Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Context } from './context';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Product } from './entities';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="md">
          <div className='flex flex-row justify-between items-center'>           
            <Link to='/' children={<h2>Products</h2>} />
            <Link to='/cart' children={
              <Badge  color="error" children={<ShoppingCart />} badgeContent={(useContext(Context).cart).reduce(
                (prev: number, curr: Product)=>{return prev+(curr.quantity)}, 0)}/>
            } />
          </div>
        </Container>
      </AppBar>
      <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/cart" Component={Cart}/>
      </Routes>
    </div>
  )
}

export default App;