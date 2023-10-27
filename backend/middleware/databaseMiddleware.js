const { MongoClient } = require('mongodb')

const databaseMiddleware = async (req, res, next) => {
  const mongoClient = await new MongoClient(process.env.DB_PRODUCTION).connect()
  db = mongoClient.db(process.env.DB_NAME)
  
  req.db = db
  
  next()
}

module.exports = databaseMiddleware