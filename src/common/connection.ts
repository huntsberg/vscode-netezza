// Create a Common DB Connection library both
// the language server and the client can use

import { Client, ClientConfig } from 'nz';

export class NzClient extends Client {
  nz_version: number;
  is_ended: boolean;

  constructor(config?: string | ClientConfig) {
    super(config);

    this.is_ended = false;
    this.on('end', () => {
      this.is_ended = true;
    });
  }
}