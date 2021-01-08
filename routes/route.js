const express = require('express');
const router = express.Router();

const Contact = require('./models/contact');

// get root 
router.get('/', (req, res, next) =>{
    res.send("good to go")
    
});

// get router
router.get('/contacts', async(req, res, next) =>{
    await Contact.find((err, contacts)=>{
        if(err){
            res.status(500).json({"Error Message": "Something went wrong!"});
        }
        else{
            res.json(contacts);
        }
    });
});

// get by name
router.get('/contacts/:id', async(req, res, next) =>{
    const id = req.params.id;
    await Contact.findById({_id : id} , (err, contact) =>{
        if(err) {
            res.status(500).json({"Error Message": "Something went wrong!"});
        }
        else{
            res.json(contact)
        }
    })
});

// post contact
router.post('/contact', async(req, res, next)=>{
    var contact = new Contact({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        phoneNumber:req.body.phoneNumber
    });
    await contact.save( (err)=>{
        if(err) {
            res.status(500).json({"Error Message": "Something went wrong!"});
        }
        else{
            res.json("successfully inserted documet");
        }
    })
})




router.delete('/contact/:id', async(req, res, next)=>{
    var id = req.params.id;
    await Contact.deleteOne({_id:id}, (err, contact) =>{
        if(err) {
            res.status(500).json({"Error Message": "Something went wrong!"});
        }
        else{
            res.json(contact);
        }
    })
})

module.exports = router;