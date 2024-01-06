import * as yup from "yup";

export const albumSchema = yup.object().shape({
  title: yup.string().required(),
  images: yup.array().optional(),
  //   startDay: yup.string().required(),
  //   endDay: yup.string().required(),
  public: yup.boolean().required(),
});

const albumValidator = {
  albumSchema,
};

export default albumValidator;
