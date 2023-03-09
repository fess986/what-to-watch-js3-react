import {system, internet} from 'faker';
import faker from 'faker';

export const fakerObject = {
  system: system.filePath(),
  number: faker.datatype.number(),
  name: faker.name.title(),
  internet: internet.avatar(),
  date: faker.datatype.datetime(),
};
