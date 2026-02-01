import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const {token} = req.headers;
    console.log('Received token:', token);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    if(!token){
        return res.json({success:false,message:"Not authorized login again"})
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log('Decoded token:', token_decode);
        if (!req.body) {
            req.body = {};
        }
        req.body.userId=token_decode.id;
        next()
    } catch (error) {
        console.log('Token verification error:', error.message);
        return res.json({success:false,message:"Token Expired login again"})
    }
}

export default authMiddleware;