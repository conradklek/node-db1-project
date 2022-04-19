const router = require("express").Router();

const md = require('./accounts-middleware');

const Account = require("./accounts-model");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", md.checkAccountId, async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.post("/", md.checkAccountPayload, async (req, res, next) => {
  try {
    const account = await Account.create(req.body);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", md.checkAccountId, md.checkAccountPayload, async (req, res, next) => {
  try {
    const updated = await Account.updateById(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", md.checkAccountId, async (req, res, next) => {
  try {
    const account = await Account.deleteById(req.params.id);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  try {
    throw new Error("argh");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
