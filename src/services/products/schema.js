import { Schema, model } from 'mongoose'

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
    reviews: [{type: Schema.Types.ObjectId, required: true.valueOf, ref:'Review'}]
  }, { timestamps: true}
)

export default model('Product', ProductSchema)