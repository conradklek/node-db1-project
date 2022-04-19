const Account = require("./accounts-model");

exports.checkAccountPayload = async (req, res, next) => {
  const error = { status: 400 }
  try {
    if (!req.body.name ) {
      res.status(400).json({ message: "name and budget are required" });
      next(error);
    } else
    if (!req.body.budget) {
      res.status(400).json({ message: "name and budget are required" });
      next(error);
    } else
    if (typeof req.body.name !== "string") {
      res.status(400).json({ message: "name of account must be a string" });
      next(error);
    } else
    if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
      res.status(400).json({ message: "name of account must be between 3 and 100" });
      next(error);
    } else
    if (typeof req.body.budget !== "number" || isNaN(req.body.budget)) {
      res.status(400).json({ message: "budget of account must be a number" });
      next(error);
    } else
    if (req.body.budget < 0 || req.body.budget > 1000000) {
      res.status(400).json({ message: "budget of account is too large or too small" });
      next(error);
    }
  } catch (err) {
    next(err);
  }
  next()
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const account = await Account.getByName(req.body.name);
    if (account.length > 0) {
      res.status(400).json({ message: "Account name already exists" });
    }
    next();
  } catch (err) {
    next(err);
  }
  next()
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Account.getById(req.params.id);
    if(account.length === 0){
      res.status(404).json({message: "Account not found"})
    }
    next()
  } catch(err){
    next(err)
  }
  next()
}
