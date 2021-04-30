import express from 'express'
import q2m from 'query-to-mongo'

import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import {v2} from 'cloudinary'

import ProductModel from './schema.js'
const productsRouter = express.Router()

const Storage = new CloudinaryStorage ({
  cloudinary: v2,
  params: {
    folder: 'amazonProds'
  }
})

const uploader = multer({
  storage : Storage
})


productsRouter.get('/', async (req, res, next) => {
  try {
    const query = q2m(req.query)
    const { products, total} = await ProductModel.findProductsWithReviews(query)
    res.send({links: query.links('/products', total), products})
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productsRouter.get('/:productId', async (req, res, next) => {
  try {
    const product = await ProductModel.findProductWithReviews(req.params.productId)
    if (!product) {
      const error = new Error()
      error.httpStatusCode = 404
      return next(error)
    }
    res.send(product)
  } catch (error) {
      console.log(error)
      next(error)
  }
})

productsRouter.post('/', async (req, res, next) => {
  try {
    const newProduct = new ProductModel(req.body)
    const {_id} = await newProduct.save()
    res.status(201).send(`data is saved with id: ${_id}`)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productsRouter.put('/:productId', async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.productId, req.body, {runValidators: true, new: ture})
    if (!product) {
      const error = new Error(`UserId ${req.params.id} is not found!`)
      error.httpStatusCode = 404
      return next(error)
    }
    res.send(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productsRouter.delete('/:productId', async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.productId)
    if (!product) {
      res.status(404).send(`User with id ${req.params.id} not found`)
    } else {
      res.send(`${req.params.id} is deleted!`)
    }

  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default productsRouter
