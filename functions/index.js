
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

exports.stripeWebhook =
functions.https.onRequest(
async (req, res) => {

    const event = req.body;

    try {

        if (
            event.type ===
            "checkout.session.completed"
        ) {

            const session =
                event.data.object;

            const userId =
                session.client_reference_id;

            await admin
            .firestore()
            .collection("users")
            .doc(userId)
            .update({

                plan:"pro"

            });

            console.log(
                "User upgraded to pro"
            );

        }

        res.sendStatus(200);

    } catch (error) {

        console.error(error);

        res.sendStatus(400);
    }

})




































