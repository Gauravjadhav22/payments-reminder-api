const jwt =require( "jsonwebtoken");

const defaultOptions = {

    expiresIn: process.env.JWT_LIFETIME,
};

const createJWT = ({payload,options})=>{
    const token= jwt.sign(payload,process.env.JWT_LIFETIME,{
        ...defaultOptions,
        ...options

    })
    return token;
}