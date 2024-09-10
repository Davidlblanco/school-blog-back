export function passwordDecoder(password: AllowSharedBufferSource) {
  const decoder = new TextDecoder();
  const decodedPassword = decoder.decode(password);
  return decodedPassword;
}
