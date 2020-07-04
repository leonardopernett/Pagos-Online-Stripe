const { Router } = require("express");
const { SECRET_KEY, PUBLIC_KEY } = require("../key");
const stripe = require("stripe")(SECRET_KEY);
const router = Router();

router.get("/", (req, res) => {
  res.render("index", { key: PUBLIC_KEY });
});

router.post("/pay", async (req, res) => {
  const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
  });

  const charge = await stripe.charges.create({
      amount: 3000, // Charing Rs 25
      description: "Web Development Product",
      currency: "usd",
      customer: customer.id,
  });

  console.log(charge.id);
  res.render("download"); 
});
module.exports = router;
