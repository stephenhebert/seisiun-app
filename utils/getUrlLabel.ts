export default function getUrlLabel(url: string) {
  return url
    .replace(/https?:\/\//, '')
}