const Account = require("./accounts-model");

exports.checkAccountPayload = async (req, res, next) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ message: "Missing name" });
    }
    next();
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
