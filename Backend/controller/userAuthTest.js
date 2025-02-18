import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const hashingFunction = async (pwd) =>{
    console.log(pwd);
    if (pwd == undefined) throw new Error('Password cannot be blank.')
    let hashedPassword =await  bcrypt.hash(pwd,10)
    console.log(hashedPassword);        
}
const comparePass = async (pwd,hashP) =>{
    let result = await bcrypt.compare(pwd,hashP);
    console.log(result);
}
const signToken = async ()=>{
    let token = await jwt.sign({email:email},'lol1234567890lol',{expiresIn:'1d'});
    console.log(token);
    
}
const verifyToken = async (userToken,userSecretKey)=>{
    let result = await jwt.verify(userToken,userSecretKey)
    console.log(result);
    
}