import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard'; 
import classes from './category.module.css'; 

function CategoryInfo() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
    .then((res) => {
        const products = res.data;
        const uniqueCategories = {};

        products.forEach(product => {
          // If this category hasn't been added yet, add it
        if (!uniqueCategories[product.category]) {
            uniqueCategories[product.category] = {
              id: product.category, // Use category name as ID for uniqueness
              // Capitalize the first letter of the category name for the title
            title: product.category.charAt(0).toUpperCase() + product.category.slice(1),
              name: product.category, // The actual category name for routing
              imgLink: product.image // Use the image of the first product found in this category
            };
        }
        });
        setCategories(Object.values(uniqueCategories));
        setLoading(false);
    })
    .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
    });
  }, []); // Empty dependency array means this runs once on mount

    if (loading) {
    return <div className={classes.loading}>Loading categories...</div>;
    }

    if (error) {
    return <div className={classes.error}>{error}</div>;
    }

    if (categories.length === 0) {
    return <div className={classes.no_categories}>No categories found.</div>;
    }

    return (
    <section className={classes.category_container}> {/* Using your existing category_container class */}
    {categories.map((categoryData) => (
        <CategoryCard key={categoryData.id} data={categoryData} />
    ))}
    </section>
    );
}

export default CategoryInfo;


// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import CategoryCard from './CategoryCard';

// function CategoryInfo() {
//     const [products, setProducts] = useState([]);
//     useEffect(()=>{
//         axios.get('https://fakestoreapi.com/products')//to get the full list of products.
//         .then((res)=>{
//             setProducts(res.data);
//         })
//         .catch((err)=>{
//             console.log(err);
//         });
//     },[]);
//   return (
//     <div>
//         {products.map((data)=>(<CategoryCard products={data} key={products.id}></CategoryCard>))}
//     </div>
//   )
// }

// export default CategoryInfo


// export const categoryInfos = [
//     {
//         id:1,
//         title: 'Electronics',
//         name: 'electronics',
//         imgLink: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg', 
//     },
//     {
//         id:2,
//         title: 'Discover fashion trends',
//         name: "women's clothing",
//         imgLink: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', 
//     },
//     {
//         id:3,
//         title: "Men's Clothing",
//         name: "men's clothing",
//         imgLink: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', 
//     },
//     {
//         id:4,
//         title: 'Jewelery',
//         name: 'jewelery',
//         imgLink: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', 
//     },
// ];