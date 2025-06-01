const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require ('express');
const cors = require("cors");
const dotenv = require("dotenv");
// const { Message } = require("firebase-functions/pubsub");
dotenv.config();
const stripe = require ("stripe")(process.env.STRIPE_KEY);

const app = express()
app.use(cors({origin:true}))

app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).json({
        Message:"Success!"
    });
});
//post request
app.post ("/payment/create", async(req,res)=>{
    const total =parseFloat(req.query.total);
    if (total>0){//Paymentintent is stripe object to collect payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount:Math.round(total*100),
            currency: "USD"

        }

        )
        
        res.status(201).json({clintSecret: paymentIntent.clinet_secret,});
    }else {
        res.status(403).json({
            message: "total must be greater than 0."
        })
    }
})

exports.api = onRequest(app);



















/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
