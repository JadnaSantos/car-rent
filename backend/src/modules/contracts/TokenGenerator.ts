export type Payload = {
  id: string
  username: string
};

export interface TokenGenerator {
  generate: (payload: Payload) => Promise<string>
}
