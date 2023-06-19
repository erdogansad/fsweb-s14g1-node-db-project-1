const router = require("express").Router();
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require("./accounts-middleware.js");
const { getAll, getById, create, updateById, deleteById } = require("./accounts-model.js");

router.get("/", async (req, res, next) => {
  try {
    let query = await getAll();
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  try {
    res.status(200).json(req.data);
  } catch (e) {
    next(e);
  }
});

router.post("/", checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    let query = await create(req.data);
    res.status(201).json(query);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    let query = await updateById(req.params.id, req.body);
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    let query = await deleteById(req.params.id);
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
