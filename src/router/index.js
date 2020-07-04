const {Router}= require('express')
const stripe = require('stripe')('sk_test_0GtckB81c7iRloQRaNDBJ2v900T93U1Jex')
const router = Router()

router.get('/',(req,res)=>{
  
     res.render('index')
  
})


router.post('/pay',async (req,res)=>{
   try {
    console.log(req.body)

    // recibe los datos 
    const customer = await stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken
    })
    //almacena orden compr 
    const charge = await stripe.charges.create({
        amount: 3000,
        currency: 'usd', 
        source: customer.id,
        description: 'software video',
      })
       console.log(charge.id)
        res.render('download')
   } catch (error) {
      console.log(error)
   }
  });
module.exports=router;