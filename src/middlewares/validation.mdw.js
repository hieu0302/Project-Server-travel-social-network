// export const validateMdw = (schema) => async (req, res, next) => {
//   try {
//     await schema.validate(req.body);
//     next();
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };

export const validateMdw =
  (schema, isUpdate = false) =>
  async (req, res, next) => {
    try {
      if (isUpdate) {
        // Nếu là chức năng update, hãy sử dụng req.params thay vì req.body
        await schema.validate(req.params);
      } else {
        // Nếu không phải là chức năng update, sử dụng req.body
        await schema.validate(req.body);
      }

      next();
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
