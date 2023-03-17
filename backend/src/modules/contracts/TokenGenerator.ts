export type Payload = {
  id: string
  username: string
  token?: string
};

export interface TokenGenerator {
  generate: (payload: Payload) => Promise<string>
}
