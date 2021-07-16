import { createServer, Model, Factory } from "miragejs";
import faker from "faker";
import { Property } from "../data/interface";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,
    models: {
      property: Model.extend<Partial<Property>>({}),
    },
    factories: {
      property: Factory.extend<Object>({
        city() {
          return faker.address.cityName();
        },
        state() {
          return faker.address.state();
        },
        type() {
          return faker.random.objectElement([
            "Apartment",
            "Single-family",
            "Townhomes",
            "Condo",
          ]);
        },
        price() {
          return faker.datatype.number(1000);
        },
      }),
    },
    routes() {
      this.namespace = "api";
      this.get("properties");
    },

    seeds(server) {
      server.createList("property", 100000);
    },
  });
}
