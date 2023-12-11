import * as yup from "yup";

export const postSchema = yup.object().shape({
  // title: yup.string().required(),
  // images: yup.string().optional(),
  // startDay: yup.date().required(),
  // endDay: yup.date().required(),
  // public: yup.boolean().required(),
});

const postValidator = {
  postSchema,
};

export default postValidator;
