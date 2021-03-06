import classes from './AvailableProducts.module.css';
import ProductItem from './ProductItem/ProductItem';

import Card from '../UI/Card';
const DUMMY_PRODUCTS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

const AvailableProducts = () => {
    const productsList = DUMMY_PRODUCTS.map(product => <ProductItem key={product.id} id={product.id} name={product.name} description={product.description} price={product.price}/>);
    return (
        <section className={classes.products}>
            <ul>
                <Card>
                    {productsList}
                </Card>
            </ul>
        </section>
    );
};

export default AvailableProducts;