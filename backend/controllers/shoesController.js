import Shoe from "../models/shoes.js";
import createError from "http-errors";

const getShoes = async (req, res, next) => {

    try{
        const shoes = await Shoe.find();
        res.status(201).json(shoes);
    }catch(err){
        console.log(err)
        return next(createError(500, "Database could not query shoes. Please try again!"))
    }
};

export default getShoes;