const joi = require('joi');
const ProductModel = require('../models/product.model.js');


const createProduct = async (req, res, next) => {
    const productSchema = joi.object({
        title: joi.string().required(),
        price: joi.number().min(0).required(),
        description: joi.string().required(),
        category: joi.string().required(),
        inStock: joi.boolean().optional()
    });

    const {error, value} = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Please provide valid data",
            error: error.details
        });
    }
    try {
        const product = new ProductModel(value);
        await product.save();
        return res.status(201).json({
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        console.error("Error creating product", error);
        next(error);
    }
};

const getAllProducts = async (req, res, next) => {
    const {limit=10, page=1} = req.query;
    const skip = (page - 1) * limit;
    try {
        console.log(req.user);
        const products = await ProductModel.find({}).sort({createdAt: -1}).skip(skip).limit(limit);
        return res.status(200).json({
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try{
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: `Product with ${req.params.id} not found`
             });
        }
        return res.status(200).json({
            message: "Product fetched successfully",
            data: product
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        next(error);
    }
};

const updateProductById = async (req, res, next) => {
        const productSchema = joi.object({
        title: joi.string().min(5).optional(),
        content: joi.string().min(5).optional(),
    });

    const {error, value} = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json("Please provide valid data", error);
    }
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id, 
            {...value}, 
            { new: true,
            runValidators: true
             });

        if (!updatedProduct) {
            return res.status(404).json({
                message: `Product with ${req.params.id} not found`
            });
        }
        return res.status(200).json({
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        console.error("Error updating product:", error);
        next(error);
    }
};

const deleteProductById = async (req, res, next) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: `Product with ${req.params.id} not found`
            });
        }
        return res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}

