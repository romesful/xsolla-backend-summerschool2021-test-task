const Product = require('../models/product');
const ObjectID = require('mongodb').ObjectID;


class ProductController{
    async get(req, res)
    {
        const sku    = req.query.sku;
        const id     = req.query.id;
        const offset = parseInt(req.query.offset);
        const count  = parseInt(req.query.count);

        let products;
        
        if (!sku && !id)
        {
            if (!offset && !count)
            {
                return res.status(400).json("Параметры `offset` и/или `count` не заданы.");
            }
            else if (offset < 0)
            {
                return res.status(400).json("Значение параметра `offset` должно быть неотрицательным целым числом.");
            }
            else if (count < 0)
            {
                return res.status(400).json("Значение параметра `count` должно быть неотрицательным целым числом.");
            }

            products = await Product.find().skip(offset).limit(count);
        }
        else if (sku)
        {
            products = await Product.find({sku: sku});
        }
        else
        {
            try
            {
                products = await Product.findById(ObjectId(id));
            }
            catch (e)
            {
                products = [];
            }
        }

        return res.json(products);
    }

    async create(req, res)
    {
        const {sku, name, type, price} = req.body;

        if (!sku)
        {   
            return res.status(400).json("Параметр `sku` не задан.");
        }
        else if (!name)
        {
            return res.status(400).json("Параметр `name` не задан.");
        }
        else if (!type)
        {
            return res.status(400).json("Параметр `type` не задан.");
        }
        else if (!price)
        {
            return res.status(400).json("Параметр `price` не задан.");
        }
        else if (isNaN(price) || parseFloat(price) <= 0)
        {
            return res.status(400).json("Неверное значение параметра `price`.");
        }

        const product = await Product.create({sku, name, type, price});//.then( (product)=>res.json(product));

        return res.json(product);
    }

    async update(req, res)
    {
        const {id, sku, name, type, price} = req.body;

        if (sku)
        {
            const product = await Product.findOneAndUpdate(sku, {name: name, type: type, price: price}, {new: true, useFindAndModify: false, omitUndefined: true });
            return res.json(product);
        }
        else if (id && ObjectID.isValid(id))
        {
            const product = await Product.findByIdAndUpdate(id, {name: name, type: type, price: price}, {new: true, useFindAndModify: false, omitUndefined: true });
            return res.json(product);
        }
        else
        {
            return res.status(400).json("Параметры `sku` или `id` не заданы, либо имеют неверные значения.");
        }
    }

    async delete_bysku(req, res)
    {
        const sku = req.params.sku;

        await Product.remove({sku: sku});
        let result = "Продукты с SKU = " + sku + " удалены.";

        return res.status(200).json(result);
    }

    async delete_byid(req, res)
    {
        const id = req.params.id;
        
        if (ObjectID.isValid(id))
            await Product.deleteOne({_id: ObjectID(id)});
        let result = "Продукты с ID = " + id + " удалены.";

        return res.status(200).json(result);
    }
}

module.exports = new ProductController();