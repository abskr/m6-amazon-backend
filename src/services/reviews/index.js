import express from "express"
import q2m from "query-to-mongo"

import ReviewModel from "./schema.js"

const router = express.Router()

router.post("/", async (req, res, next) => {
  try {
    const newReview = new ReviewModel(req.body)

    const { _id } = await newReview.save()
    res.status(201).send(_id)
  } catch (error) {
    next(error)
  }
})

router.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query)
    const total = await ReviewModel.countDocuments(query.criteria)

    const reviews = await ReviewModel.find(query.criteria, query.options.fields)
      .skip(query.options.skip)
      .limit(query.options.limit)
      .sort(query.options.sort)

    res.send({ links: query.links("/review", total), reviews })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const review = await ReviewModel.findById(req.params.id)
    res.send(review)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const modifiedReview = await ReviewModel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    })
    if (modifiedReview) {
      res.send(modifiedReview)
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const review = await ReviewModel.findByIdAndDelete(req.params.id)
    if (review) {
      res.send(review)
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default router
