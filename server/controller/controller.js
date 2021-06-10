var Userdb = require('../model/model');

//create and save new user

exports.create = (req, res)=>{
   //validate request
   if(!req.body){
       res.status(400).send({message:"Content can not be empty"});
       return;
   }

   //new User
   const user = new Userdb({
       name:req.body.name,
       email:req.body.email,
       gender:req.body.gender,
       status:req.body.status
   })

   //save user
   user
   .save(user) 
   .then(data=>{
      // res.send(data);
      res.redirect('/add-user');
   })
   .catch(err=>{
       res.status(500).send({
           message:err.message || "some error occurred while a create operation"
       })
   })
    
}

//retrive and return all users / retrive and return a single user
exports.find = (req,res)=>{

    if(req.body.id){
      const id = req.body.id;
      Userdb.findById(id)
      .then(data=>{
          if(!data){
              res.status(404).send({message:"Not found user id"+id})
          }else{
              res.send(data);
          }
      })
      .catch(err=>{
          res.status(500).send({message:"Error with retriving data"+id})
      })
    }else{
  Userdb.find()
  .then(user=>{
      res.send(user)
  })
  .catch(err=>{
      res.status(500).send({message:err.message || "Error occured by retiving user information"})
  })
}
}

//update a new identifed user by user id
exports.update=(req,res)=>{
  if(!req.body){
      return res
      .status(400)
      .send({message:"Data to update cannot be empty"})
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
  .then(data=>{
      if(!data){
          res.status(404).send({message:`Cannot update user with ${id} may be user not found`})
      }else{
          res.send(data);
      }
  })
  .catch(err=>{
      res.status(500).send({message:"Error update user Infomation"})
  })
}

//delete a user with specified user id in the request
exports.delete = (req,res)=>{
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
  .then(data=>{
      if(!data){
          res.status(404).send({message:`Cannot delete with ${id} may be id is wrong`})
      }else{
          res.send({
          message: "User was deleted Successfully"});
      }
  })
 .catch(err=>{
     res.status(500).send({
         message:"Could not delete user with id "+ id
     });
 }); 
}