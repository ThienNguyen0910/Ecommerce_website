const Products = require('../models/productModel')

//filter  , sort , paginating
class APIfeatures {
    constructor(query , queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}
        console.log({before: queryObj})
        const excludedFields = ['page' , 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        console.log({after: queryObj})

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g , match => '$' + match)

        console.log({queryObj , queryStr})

        this.query.find(JSON.parse(queryStr))
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1||1
        const limit = this.queryString.limit * 1||12
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)

        return this; 
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find() , req.query).filtering().sorting().paginating()
            const products = await features.query
            // 
            // if (!products) return res.status(400).json({ msg: "san pham khong ton tai" })
            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProducts: async (req, res) => {
        try {
            const { product_id, title, price, category, description, images, content } = req.body;

            if (!images) return res.status(400).json({ msg: "no images uploaded" })

            const product = await Products.findOne({product_id})

            if (product) return res.status(400).json({ msg: "product is already exist!" })

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, category, description, images, content
            })
            await newProduct.save()

            res.json({ msg: "product created!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProducts: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "product deleted"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProducts: async (req, res) => {
        try {
            const {title, price, category, description, images, content } = req.body

            if(!images) return res.status(400).json({ msg: "no images uploaded" })

            await Products.findByIdAndUpdate({_id: req.params.id},{
                title: title.toLowerCase() , price, category, description, images, content
            })

            res.json({msg: "product is updated!"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = productCtrl