interface RequestValidator {
  validate: (data: unknown) => Promise<boolean>
}

export { RequestValidator };
