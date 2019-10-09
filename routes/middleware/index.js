const differentArr = (arr, obj, res, type) => {
  try {
    const list_difference = [];
    for (let i = 0; i < arr.length; i++) {
      if (!Object.keys(obj).includes(arr[i])) {
        list_difference.push(arr[i]);
      }
    }

    if (list_difference.length > 0) {
      throw new Error(`Missing ${type}: ${list_difference.toString()} `);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const requireFields = data => (req, res, next) => {
  const { body, param, query } = data;

  body && differentArr(body, req.body, res, "body");
  param && differentArr(param, req.param, res, "param");
  query && differentArr(query, req.query, res, "query");
  next();
};

const validateFields = (req, res, next) => {};

module.exports = { requireFields };
