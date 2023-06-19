const db = require("../../data/db-config.js");

exports.checkAccountPayload = (req, res, next) => {
  let { name, budget } = req.body;

  if (name !== undefined && budget !== undefined) {
    if (name.trim().length >= 3 && name.trim().length < 100) {
      if (!isNaN(budget) && budget !== null) {
        if (Number(budget) > 0 && Number(budget) < 1000001) {
          next();
        } else {
          next({ status: 400, message: "budget of account is too large or too small" });
        }
      } else {
        next({ status: 400, message: "budget of account must be a number" });
      }
    } else {
      next({ status: 400, message: "name of account must be between 3 and 100" });
    }
  } else {
    next({ status: 400, message: "name and budget are required" });
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    let query = await db("accounts").where({ name: req.body.name }).first();

    if (query) {
      next({ status: 400, message: "that name is taken" });
    } else {
      req.data = { name: req.body.name.trim(), budget: Number(req.body.budget) };
      next();
    }
  } catch (e) {
    next(e);
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    let query = await db("accounts")
      .where({ id: Number(req.params.id) })
      .first();

    if (query) {
      req.data = query;
      next();
    } else {
      next({ status: 404, message: "account not found" });
    }
  } catch (e) {
    next(e);
  }
};
