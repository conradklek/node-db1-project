const router = require("express").Router();

const md = require('./accounts-middleware');

const Account = require("./accounts-model");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", md.checkAccountId, async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.post("/", md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  try {
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", md.checkAccountId, md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  try {
    const account = await Account.updateById(req.params.id, req.body);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", md.checkAccountId, async (req, res, next) => {
  try {
    const account = await Account.deleteById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.use(async (err, req, res, next) => {
  try {
    throw new Error("argh");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
