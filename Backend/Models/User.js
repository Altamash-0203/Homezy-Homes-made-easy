let mongoose=require("mongoose")
let bcrypt=require("bcryptjs")


let userSchema=new mongoose.Schema({
    name: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required:true,
    unique: true,
  },
  password: {
    type: String,
    required:true,
  }
})




userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

        this.password=await bcrypt.hash(this.password,10)
        next()
})



userSchema.methods.matchPassword=async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

let User=mongoose.model("HomzyUsers",userSchema);

module.exports=User