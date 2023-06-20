import Joi from "joi";
import BadRequestError from "../modules/error/error.classes/BadRequestError";
import { NextFunction, Request, Response } from "express";

const validateUserCreationInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const inputs = req.body;

  // define JOI schema
  const inputVaidationSchema = Joi.object({
    id: Joi.string().required().messages({
      "string.base": "ID must be a string",
      "any.required": "ID is required",
    }),
    name: Joi.string().required().messages({
      "string.base": "Name must be a string",
      "any.required": "Name is required",
    }),
    dob: Joi.date().required().messages({
      "date.base": "DOB must be a date",
      "any.required": "DOB is required",
    }),
    address: Joi.string().required().messages({
      "string.base": "Address must be a string",
      "any.required": "Address is required",
    }),
    contactNumber: Joi.string().required().messages({
      "string.base": "Contact Number must be a string",
      "any.required": "Contact Number is required",
    }),
    children: [
      Joi.array().items(
        Joi.object({
          id: Joi.string().required().messages({
            "string.base": "Child's ID must be a string",
            "any.required": "Child's ID is required",
          }),
          name: Joi.string().required().messages({
            "string.base": "Child's Name must be a string",
            "any.required": "Child's Name is required",
          }),
          dob: Joi.date().required().messages({
            "date.base": "Child's DOB must be a date",
            "any.required": "Child's DOB is required",
          }),
        })
      ),
    ],
  });

  const childDuplicationValidationSchema = Joi.array()
    .unique((a, b) => a.id === b.id)
    .messages({
      "array.unique": "Duplicate Child IDs are not allowed!",
    });

  const { error: inputVaidationError } = inputVaidationSchema.validate(inputs);
  const { error: childDuplicationError } =
    childDuplicationValidationSchema.validate(inputs.children);

  if (inputVaidationError)
    throw new BadRequestError(inputVaidationError.message);
  if (childDuplicationError)
    throw new BadRequestError(childDuplicationError.message);

  req.body.sanitizedInputs = inputs;
  next();
};

export default { validateUserCreationInputs };
