const { faker } = require("@faker-js/faker")
const boom = require('@hapi/boom');

class MuseumServices {

  constructor() {
    this.museums = [];
  }

  async find(limit) {
    if (this.museums.length == 0) {
      throw boom.notFound('Museums not found');
    }
    if (limit) {
      return this.museums.slice(0, limit);
    }
    return this.museums;
  }

  async findOne(id) {
    //Inyectamos un error para ver si funciona el Middleware de error
    //const error = this.museums.error();
    //Primera forma de retornar un objeto especifico usando filter
    // return this.museums.filter(function (item) {
    //   return (item.id == id);
    // });
    //Segunda forma de retornar un objeto especifico usando find
    const museum = this.museums.find(item => item.id == id);
    if (!museum) {
      throw boom.notFound(`The museum with the id [${id}] not found`);
    }
    if (museum.isBlock) {
      throw boom.conflict(`The museum with the id [${id}] is locked`);
    }
    return museum;
  }

  async create(museum) {
    const consecutive = this.museums.length + 1;
    const existMuseumName = this.museums.find(item => item.name == museum.name);
    if (existMuseumName) {
      throw boom.conflict(`The museum with the name [${museum.name}] already exists`);
    }
    if (!museum.isBlock) {
      museum.isBlock = false;
    }
    museum.id = consecutive;
    this.museums.push(museum);
    return museum;
  }

  async generate(limit) {
    for (let index = 1; index <= limit; index++) {
      this.museums.push({
        name: `Museo ${faker.address.country()}`,
        description: faker.lorem.paragraph(),
        address: faker.address.streetAddress(),
        city: faker.address.cityName(),
        image: 'https://www.unesco.org/sites/default/files/2021-09/museums.jpg',
        isBlock: faker.datatype.boolean(),
        id: index
      });
    }
  }

  async update(id, data) {
    //Obtenemos el index del museo
    const indexMuseum = this.museums.findIndex(item => item.id == id);
    //Validamos si existe el museo, de ser asi lo actualizamos
    if (indexMuseum !== -1) {
      data.id = id;
      this.museums[indexMuseum] = data;
      return this.museums[indexMuseum];
    } else {
      throw boom.notFound(`The museum with the id [${id}] not found`);
    }
  }

  async parcialUpdate(id, data) {
    //Obtenemos el index del museo
    const indexMuseum = this.museums.findIndex(item => item.id == id);
    //Validamos si no existe el museo
    if (indexMuseum == -1) {
      throw boom.notFound(`The museum with the id [${id}] not found`);
    }
    //Obtenemos el museo
    const filteredMuseum = await this.findOne(id);
    //Validamos y actualizamos los parametros que bien en el request
    if (data.name) {
      filteredMuseum.name = data.name;
    }
    if (data.description) {
      filteredMuseum.description = data.description;
    }
    if (data.address) {
      filteredMuseum.address = data.address;
    }
    if (data.city) {
      filteredMuseum.city = data.city;
    }
    if (data.image) {
      filteredMuseum.image = data.image
    }
    if (data.isBlock) {
      filteredMuseum.isBlock = data.isBlock
    }
    this.museums[indexMuseum] = filteredMuseum;
    return filteredMuseum;
  }

  async deleteAll() {
    //Validamos si hay museos registrados
    if (this.museums == 0) {
      throw boom.notFound('Museums not found');
    }
    this.museums = [];
    return true;
  }

  async deleteOne(id) {
    //Validamos si viene el id por query params
    //Obtenemos index del museo
    const indexMuseum = this.museums.findIndex(item => item.id == id);
    //Validamos si el id existe
    if (indexMuseum == -1) {
      throw boom.notFound(`The museum with the id [${id}] not found`);
    }
    this.museums.splice(indexMuseum, 1);
    return id;
  }

}
module.exports = MuseumServices;
