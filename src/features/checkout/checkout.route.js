import express, { response } from "express";
var paypal = require("paypal-rest-sdk");

const router = express.Router();

router.get("/", (req, res) => {
  paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id: "EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM",
    client_secret: "EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM",
  });

  var create_payment_json = {
    intent: "authorize",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/return",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price: "1.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "1.00",
        },
        description: "This is the payment description.",
      },
    ],
  };

  //Passing in the second_config here would override default settings
  //and use SECOND_CLIENT_ID and SECOND_CLIENT_SECRET for creating the payment
  //After buyer approves the payment via the HATEOS approval url, the second_config
  //would need to be passed in the payment.execute call as well, otherwise
  //a 404 with INVALID_RESOURCE_ID would get returned
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      res.status(201).send({ status: 201, data: payment });
    }
  });
});

export default router;
