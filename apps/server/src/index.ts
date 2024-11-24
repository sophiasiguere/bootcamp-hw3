import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import {  PrismaClient } from '../../../packages/databases/prisma/prisma-client'
import { productsRoute } from './routes/products'
import { variantsRoute } from './routes/variants'
import { collectionsRoute } from './routes/collections'

const app = express()
const client = new PrismaClient()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

productsRoute(app)
variantsRoute(app)
collectionsRoute(app)

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
