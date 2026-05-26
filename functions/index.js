const { onRequest } = require("firebase-functions/v2/https");

const admin = require("firebase-admin");

const Stripe = require("stripe");

admin.initializeApp();

exports.stripeWebhook = onRequest(
{
    secrets:["STRIPE_SECRET_KEY"]
},
async (req, res) => {

    const stripe = new Stripe(
        process.env.STRIPE_SECRET_KEY
    );

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

});
