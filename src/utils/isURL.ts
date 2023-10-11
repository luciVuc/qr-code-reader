const URL_REGEX = /^((https|http|ftp|file)+?(:\/\/)?)?(www\.)?([\w\d-]+\.)*[\w-]+(\.|:\d+)\w+([/?=&#.]?[\w-]+)*\/?/;

export function isURL(value?: string) {
  return value?.length && URL_REGEX.test(value);
}
export default isURL;