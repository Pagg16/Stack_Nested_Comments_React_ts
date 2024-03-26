export function useUser() {
  const match = document.cookie.match(/userId=(?<id>[^;]+);?$/);
  const id = match?.groups?.id || null;
  return { id };
}
