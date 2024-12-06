import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success : false,
                message : "Unauthorized user",
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                success : false,
                message : "Invalid token",
            })
        }
        req.id = decode.userId;
        next();
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal server error",
        }) 
    }
}
export default isAuth