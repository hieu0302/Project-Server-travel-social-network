import * as yup from "yup";

export const postSchema = yup.object().shape({
  title: yup.string().required(),
  images: yup.array().optional(),
  startDay: yup.string().required(),
  endDay: yup.string().required(),
  public: yup.boolean().required(),
});

const postValidator = {
  postSchema,
};

export default postValidator;
