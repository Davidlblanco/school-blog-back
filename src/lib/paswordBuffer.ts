export function passwordBuffer(password: string) {
  const encoder = new TextEncoder();
  const passwordUint8Array = encoder.encode(password);
  const passwordBuffer = Buffer.from(passwordUint8Array);
  return passwordBuffer;
}
