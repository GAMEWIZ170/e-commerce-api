const Joi = require('joi');
const mongoose = require('mongoose');
const ProductModel = require('../models/product.model.js');


// CREATE PRODUCT
const createProduct = async (req, res, next) => {
    const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        description: Joi.string().optional(),
        category: Joi.string().required(),
        inStock: Joi.boolean().optional()
    });

    const { error, value } = productSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Please provide valid product data',
            error: error.details
        });
    }

    try {
        const product = new ProductModel(value);

        await product.save();

        return res.status(201).json({
            message: 'Product created successfully',
            data: product
        });

    } catch (error) {
        console.error('Error creating product:', error);
        next(error);
    }
};


// GET ALL PRODUCTS
const getAllProducts = async (req, res, next) => {
    try {
        let {
            page = 1,
            limit = 10,
            sort = 'createdAt',
            search,
            name,
            category
        } = req.query;

        page = Number(page);
        limit = Number(limit);

        // Validate pagination values
        if (
            !Number.isInteger(page) ||
            page < 1 ||
            !Number.isInteger(limit) ||
            limit < 1
        ) {
            return res.status(400).json({
                message: 'Page and limit must be positive integers'
            });
        }

        const skip = (page - 1) * limit;

        // Build filter
        const filter = {};

        // Search by product name
        const searchTerm = search || name;

        if (searchTerm) {
            filter.name = {
                $regex: searchTerm,
                $options: 'i'
            };
        }

        // Filter by category
        if (category) {
            filter.category = {
                $regex: category,
                $options: 'i'
            };
        }

        // Get total number of matching products
        const totalProducts = await ProductModel.countDocuments(filter);

        // Sorting
        let sortOption = {};

        if (sort.startsWith('-')) {
            sortOption[sort.substring(1)] = -1;
        } else {
            sortOption[sort] = 1;
        }

        const products = await ProductModel.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({
            message: 'Products fetched successfully',
            data: products,
            pagination: {
                currentPage: page,
                limit,
                totalProducts,
                totalPages
            }
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        next(error);
    }
};


// GET SINGLE PRODUCT
const getProductById = async (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: 'Invalid product ID'
        });
    }

    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: `Product with ID ${req.params.id} not found`
            });
        }

        return res.status(200).json({
            message: 'Product fetched successfully',
            data: product
        });

    } catch (error) {
        console.error('Error fetching product:', error);
        next(error);
    }
};


// UPDATE PRODUCT
const updateProductById = async (req, res, next) => {

    const productSchema = Joi.object({
        name: Joi.string(),
        price: Joi.number().min(0),
        description: Joi.string(),
        category: Joi.string(),
        inStock: Joi.boolean()
    }).min(1);

    const { error, value } = productSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Please provide valid product data',
            error: error.details
        });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: 'Invalid product ID'
        });
    }

    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            value,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: `Product with ID ${req.params.id} not found`
            });
        }

        return res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct
        });

    } catch (error) {
        console.error('Error updating product:', error);
        next(error);
    }
};


// DELETE PRODUCT
const deleteProductById = async (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: 'Invalid product ID'
        });
    }

    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: `Product with ID ${req.params.id} not found`
            });
        }

        return res.status(200).json({
            message: 'Product deleted successfully',
            data: product
        });

    } catch (error) {
        console.error('Error deleting product:', error);
        next(error);
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
};