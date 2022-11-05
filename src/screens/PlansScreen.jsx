import React, { useState, useEffect } from 'react'
import "./PlansScreen.css"
import db from '../firebase'
import {
    collection,
    doc,
    setDoc,
    query,
    where,
    getDocs,
    CollectionReference,
    onSnapshot,
    getDoc,
    addDoc,
  } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from "../features/userSlice";
import { loadStripe } from '@stripe/stripe-js';




function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser)

    useEffect(() => {
        const q = query(collection(db, "products"), where("active", "==", true));

        onSnapshot(q, (querySnapshot) => {
          const products = {};
    
          querySnapshot.forEach(async (productDoc) => {
            products[productDoc.id] = productDoc.data();
    
            const productDocRef = doc(db, "products", productDoc.id);
            
            const priceSnap = await getDocs(collection(productDocRef, "prices"));
    
            priceSnap.forEach((price) => {
              products[productDoc.id].prices = {
                priceId: price.id,
                priceData: price.data(),
              };
            });
          });
          setProducts(products);
        });
    }, [])

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers')
        .doc(user.uid).collection('checkout_sessions').add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        })

        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data()
            if (error) {
               alert(`An error occured: ${error.message}`) 
            }

            if (sessionId) {

                const stripe = await loadStripe("pk_test_51M0ZESABacjKF9nZauy1WCynNUfQAKuKGZjxYQGE9cfxRD7YEsXP0cReUFgSobViGYXLybGyEOXcKLQwORsUgKKT00uJdXwj2E");
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }

  return (
    <div className='plansScreen'>
        {Object.entries(products).map(([productId, productData]) => {
            // add some logic to check if users subscription is active
            return (
                <div className="plansScreen__plan">
                    <div className="plansScreen__info">
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                    </div>

                    <button onClick={() => loadCheckout(productData?.prices?.priceId)}>Subscribe</button>
                </div>
            )
        })}
    </div>
  )
}

export default PlansScreen