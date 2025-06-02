import React, {useEffect, useState} from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import {db} from "../../Utility/firebase"
import { collection, doc, query, orderBy,onSnapshot } from 'firebase/firestore'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { useContext } from 'react'
import classes from "./Orders.module.css"
import ProductCard from "../../Components/Product/ProductCard"
function Orders() {
  //Destructure user and dispatch from DataContext
  const [{user},dispatch] = useContext (DataContext)
  //states to store the fetched orders
  const [Orders, setOrders] = useState([])
  //state to manage loading status
  const [loading, setLoading]= useState(true);
  useEffect(()=>{
    setLoading(true);
    setOrders([]);
    //check if a user is logged in
    if(user){
      //1.get a reference to the specific user's document
      //doc(firestore_instance,collection_path, document_id)
      const userDocRef = doc(db,"users", user.uid);
      //2.get a reference to the "orders" sub collection within that user's document collection(parent_document_reference, sub_collection_path)
      const ordersCollectionRef = collection(userDocRef,"orders");
      //3. create a query to order the documents 
      //query(collection_reference, orderBy_clause)
      const q = query(ordersCollectionRef, orderBy('created','desc'));
      //set up a real-time listener using onSnapshot with the query
      //this listener will update the "orders" state whenever data changes in Firestore
      const unsubscribe = onSnapshot (
        q,
        (snapshot)=>{
          //map the snapshot documents to an array of orders objects
          //each order object will have an 'id' and 'data'
          setOrders(
            snapshot.docs.map((doc)=>({
              id: doc.id,
              data: doc.data(),
            })),
          );
          setLoading(false); //set loading to false once data is fetched
          console.log(snapshot)

        },
        (err)=>{
          //Handle any errors that occur during the Firestore fetch
          console.error('Error fetching orders:', err);
          setError(err); //store the error in state
          setLoading(false); //set loading false even on error
        }
        
      );
      //cleanup function for the useEffect hook
      //this will unsubscribe from the Firestore listener when the component unmounts
      //or when the "user" dependency changes (and the effect re-runs)
      return()=> unsubscribe();
      
    }else{
      //if no user is logged in, clear the orders and wt loading to false
      setOrders([]);
      setLoading(false);

    }
  },[user]);//Dependency array: re-run this effect whenever the "user" object changes
  return (
    <LayOut>
        <section className={classes.container}>
          <div className={classes.Orders_container}>
            <h2>Your Orders</h2>
            {
              Orders?.length == 0 && <div style={{padding:"12px"}}>
                You don't have orders yet!
              </div>
            }
            
            {/*Ordered items */}
            <div>
              {
                Orders?.map((eachOrder)=>{
                  return (
                    <div> 
                      <hr />
                      <p>order ID: {eachOrder?.id}</p>
                      {
                        eachOrder?.data?.basket?.map(itemInBasket=>{
                          return <ProductCard
                          flex={true}
                          product={itemInBasket}
                          key={itemInBasket.id || itemInBasket.title || index}/>
                        })
                      }
                    </div>
                  )
                })
              }

            </div>
          </div>
        </section>
    </LayOut>
  )
}

export default Orders