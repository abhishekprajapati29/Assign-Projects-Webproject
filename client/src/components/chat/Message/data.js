export default function DataCheck(message) {
  if (message.indexOf(" ") === -1 && message.length >= 20) {
    return message.slice(0, 20) + "...";
  }

  return message;
}
