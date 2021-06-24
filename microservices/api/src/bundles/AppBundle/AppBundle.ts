import { BaseBundle } from "@kaviar/x-bundle";
import * as listeners from "./listeners";
import * as collections from "./collections";
import * as validators from "./validators";
import * as fixtures from "./fixtures";

import graphqlModule from "./graphql";
import { PassportService } from "@kaviar/apollo-security-bundle";
import { FacebookAuthenticator } from "./services/security/FacebookAuthenticator";

export class AppBundle extends BaseBundle<any> {
  async prepare() {
    this.setupBundle({
      listeners,
      collections,
      validators,
      fixtures,
      graphqlModule,
    });
  }

  async init() {
    const passportService = this.container.get(PassportService);
    passportService.register(FacebookAuthenticator);
  }
}
