const db = require("../../data/db-config.js");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts")
    .where({ id: Number(id) })
    .first();
};

const create = (account) => {
  return db("accounts")
    .insert(account)
    .then((idx) => ({ id: idx, ...account }));
};

const updateById = (id, account) => {
  return db("accounts")
    .where("id", Number(id))
    .update(account)
    .then((idx) => ({ id: idx, ...account }));
};

const deleteById = (id) => {
  return db("accounts").where("id", Number(id)).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
