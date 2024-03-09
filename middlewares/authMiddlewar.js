import jwt from 'jsonwebtoken'

const authMiddlewar=async(req,res,next)=>{
try {
    // console.log(req.headers.authorization);
    const token= await req.headers.authorization.split(" ")[1];
    // console.log(token);
    
    //The jwt.verify() function checks the validity of the token and decodes its payload. If the token is valid, it invokes the callback function with err being null and decode containing the decoded token payload.
    
    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if (err) {
            return res.status(401).send({
                message:"Auth Failed",
                success:false
            })
            
        } else {
            // console.log(req.body);
            req.body.userId = decode.id;
            // console.log(req.body);
            next()
        }
    })
    
} catch (err) {
    res.status(500).send({
        message:"Internel server error",
        error: err,
        success:false
    })
}
}

export default authMiddlewar
