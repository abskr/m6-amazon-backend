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
    const { products, total} = findProductsWithReviews(query)
    res.send({links: query.links('/products', total), products})
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productsRouter.get('/:productId', async (req, res, next) => {
  try {
    const product = await ProductsModel.findProductWithReviews(req.params.productId)
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
    
  } catch (error) {

  }
})

productsRouter.put('/:productId', async (req, res, next) => {
  try {

  } catch (error) {

  }
})

productsRouter.delete('/', async (req, res, next) => {
  try {

  } catch (error) {

  }
})

export default productsRouter
