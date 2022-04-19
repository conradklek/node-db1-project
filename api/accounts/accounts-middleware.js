const db = require('../../data/db-config')

const Account = require("./accounts-model");

exports.checkAccountPayload = async (req, res, next) => {
  try {
    let error = { status: 400 }
    if (!req.body.name ) {
      error.message = "name and budget are required"
    } else
    if (!req.body.budget) {
      error.message = "name and budget are required"
    } else
    if (typeof req.body.name !== "string") {
      error.message = "name of account must be a string"
    } else
    if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
      error.message = "name of account must be between 3 and 100"
    } else
    if (typeof req.body.budget !== "number" || isNaN(req.body.budget)) {
      error.message = "budget of account must be a number"
    } else
    if (req.body.budget < 0 || req.body.budget > 1000000) {
      error.message = "budget of account is too large or too small"
    }
    if (error.message) {
      res.status(400).json(error);
    } else {
      next()
    }
    next();
  } catch (err) {
    next(err);
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db('accounts').where('name', req.body.name.trim()).first();
    if (existing) {
      const error = { status: 400, message: "that name is taken" }
      res.status(400).json(error);
      next(error)
    } else {
      next()
    }
    next();
  } catch (err) {
    next(err);
  }
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Account.getById(req.params.id);
    if(!account) {
      const error = { status: 404, message: "account not found" }
      res.status(404).json(error);
      next();
    } else {
      req.account = account;
      next();
    }
    next()
  } catch(err){
    next(err)
  }
}
