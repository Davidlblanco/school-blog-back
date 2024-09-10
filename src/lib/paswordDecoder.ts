export function passwordDecoder(password: AllowSharedBufferSource) {
  const encoder = new TextDecoder();
  const decodedPassword = encoder.decode(password);
  return decodedPassword;
}
