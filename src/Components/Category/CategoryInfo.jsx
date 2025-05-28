// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CategoryCard from './CategoryCard'; 
// import classes from './category.module.css'; 

// function CategoryInfo() {
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//     axios.get('https://fakestoreapi.com/products')
//     .then((res) => {
//         const products = res.data;
//         const uniqueCategories = {};

//         products.forEach(product => {
//           // If this category hasn't been added yet, add it
//         if (!uniqueCategories[product.category]) {
//             uniqueCategories[product.category] = {
//               id: product.category, // Use category name as ID for uniqueness
//               // Capitalize the first letter of the category name for the title
//             title: product.category.charAt(0).toUpperCase() + product.category.slice(1),
//               name: product.category, // The actual category name for routing
//               imgLink: product.image // Use the image of the first product found in this category
//             };
//         }
//         });
//         setCategories(Object.values(uniqueCategories));
//         setLoading(false);
//     })
//     .catch((err) => {
//         console.error("Error fetching products:", err);
//         setError("Failed to load categories. Please try again later.");
//         setLoading(false);
//     });
//   }, []); // Empty dependency array means this runs once on mount

//     if (loading) {
//     return <div className={classes.loading}>Loading categories...</div>;
//     }

//     if (error) {
//     return <div className={classes.error}>{error}</div>;
//     }

//     if (categories.length === 0) {
//     return <div className={classes.no_categories}>No categories found.</div>;
//     }

//     return (
//     <section className={classes.category_container}> {/* Using your existing category_container class */}
//     {categories.map((categoryData) => (
//         <CategoryCard key={categoryData.id} data={categoryData} />
//     ))}
//     </section>
//     );
// }

// export default CategoryInfo;


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


export const categoryInfos = [
    {
        id:1,
        title: 'Electronics',
        name: 'electronics',
        imgLink: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_TV_2X._SY304_CB432517900_.jpg', 
    },
    {
        id:2,
        title: 'Discover fashion trends',
        name: "women's clothing",
        imgLink: 'https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg', 
    },
    {
        id:3,
        title: "Men's Clothing",
        name: "men's clothing",
        imgLink: 'https://m.media-amazon.com/images/I/618bcm65ksL._AC_UL480_FMwebp_QL65_.jpg', 
    },
    {
        id:4,
        title: 'Jewelery',
        name: 'jewelery',
        imgLink: 'https://m.media-amazon.com/images/I/71r7eWuCsaL._AC_UL480_FMwebp_QL65_.jpg', 
    },
];