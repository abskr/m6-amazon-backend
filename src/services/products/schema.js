import mongoose from 'mongoose'
const { Schema, model } = 'mongoose'

const ProductSchema = new Schema(
  {
    name: {type: String, required: true, trim: true},
    description: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl : { type: mongoose.SchemaTypes.Url, required: true},
    price : {type: Number, required: true},
    caterogy: String,
    reviews: [{type: Schema.Types.ObjectId,  ref:'Review'}]
  }, { timestamps: true}
)

  ProductSchema.post('validate', function (error, doc, next) {
    if (error) {
      error.errorList = error.errors
      error.httpStatusCode = 400
      next(error)
    } else {
      next()
    }
  })

ProductSchema.static('findProductWithReviews', async function(productId){
    const product = await this.findOne({ _id: productId}.populate('reviews'))
    return product
})

ProductSchema.static('findProductsWithReviews', async function(query){
  const total = await this.countDocuments(query.criteria)
  const products = await this.find(query.criteria).skip(query.options.skip).limit(query.options.limit).sort(query.options.sort).populate('reviews')

  return { total, products }
})



export default model('Product', ProductSchema)