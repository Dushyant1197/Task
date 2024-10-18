const { body, validationResult } = require("express-validator");
const validateUser = [
  body("name").isString().notEmpty().trim().withMessage("enter string "),
  body("email").isEmail().trim().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 6, max: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role").isString().notEmpty().trim().withMessage("enter valid role"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateUser };
