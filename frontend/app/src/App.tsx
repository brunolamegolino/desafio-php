import { useContext, useState } from 'react';
import { AppBar, Badge, Container, Menu, MenuItem } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Context } from './context';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Product } from './entities';
import CreateProduct from './pages/CreateProduct';
import ProductView from './pages/ProductView';
import Test from './pages/Test';

function App() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className='flex flex-col max-h-screen'>
      <AppBar position='static' className='h-fit'>
        <Container maxWidth="md">
          <div className='flex flex-row justify-between items-center'>           
          <MenuIcon className='cursor-pointer' onClick={() => setOpenMenu(true)} id='menu'/>
          <Menu
            anchorEl={document.getElementById('menu')}
            open={openMenu}
            onClose={() => {setOpenMenu(false)}}>
            <MenuItem>
              <Link to={'/product'}>Create Product</Link></MenuItem>
          </Menu>
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
        <Route path="/product" Component={CreateProduct}/>
        <Route path="/product/:id" Component={ProductView}/>
        <Route path="/test" Component={Test}/>
      </Routes>
    </div>
  )
}

export default App;