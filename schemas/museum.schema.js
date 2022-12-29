const Joi = require("joi")

//Definimos los esquemas para cada parámetro
const id = Joi.number().min(1);
const name = Joi.string().min(5).max(192);
const description = Joi.string().min(5).max(500);
const address = Joi.string().min(5).max(500);
const city = Joi.string().min(5).max(100);
const image = Joi.string().uri();
const isBlock = Joi.boolean();
const noMuseums = Joi.number().min(1).max(1000);

const getMuseumSchema = Joi.object({
  id: id.required(),
});

const createMuseumSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  address: address.required(),
  city: city.required(),
  image: image.required(),
});

const updateMuseumSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  address: address.required(),
  city: city.required(),
  image: image.required(),
  isBlock: isBlock.required(),
});

const updateParcialMuseumSchema = Joi.object({
  name: name,
  description: description,
  address: address,
  city: city,
  image: image,
  isBlock: isBlock,
});

const generateMuseumsSchema = Joi.object({
  noMuseums: noMuseums.required(),
});

module.exports = { getMuseumSchema, createMuseumSchema, updateMuseumSchema, generateMuseumsSchema, updateParcialMuseumSchema };
