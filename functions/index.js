const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// logger.info("Attempting to load Stripe Key. Value:", process.env.STRIPE_KEY);
// if (!process.env.STRIPE_KEY) {
//     logger.error("STRIPE_KEY is UNDEFINED or EMPTY!");
// }
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
    const totalString = req.query.total;
    logger.info("Received total string from frontend query:", {totalString: totalString});
    const totalInCents = parseInt (totalString * 100)
    logger.info("Parsed total in cents:", {totalInCents: totalInCents});
    if (isNaN(totalInCents) || totalInCents <= 0){
        logger.error("Invalid total amount received.", {totalReceived: totalString, parsedTotal: totalInCents});
        return res.status(400).json({ // Use 400 for bad request
            message: "Total amount must be a positive number in cents."
        });
    }
    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalInCents, // Use the totalInCents directly (already multiplied by 100 on frontend)
            currency: "USD",
            // You might want to add more options like automatic_payment_methods
            // automatic_payment_methods: {enabled: true},
        });

        logger.info("PaymentIntent created successfully.", {clientSecret: paymentIntent.client_secret, amount: paymentIntent.amount});

        // Respond with the client secret
        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        logger.error("Error creating PaymentIntent:", error); // Log the actual error from Stripe
        // Send a 500 Internal Server Error response if something goes wrong
        res.status(500).json({
            message: "Failed to create Payment Intent.",
            error: error.message // Include error message for debugging
        });
    }
});


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
