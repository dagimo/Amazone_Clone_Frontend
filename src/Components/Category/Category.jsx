import React from 'react'
import CategoryCard from './CategoryCard'
import{categoryInfos} from './CategoryInfo'
import classes from './category.module.css'

function Category() {
  return (
    <section className={classes.category_container}>
        {
        categoryInfos.map((infos)=>{
            return <CategoryCard data = {infos}/>
        })
        }

    </section>
  )
}

export default Category