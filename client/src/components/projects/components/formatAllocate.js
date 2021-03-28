export default function formatBytes1(bytes, decimals = 2, data=0) {
  if(data === 0){
  if (bytes === 0) return 0;

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  return [parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), sizes[i]];
  }
  else
  {
    if (bytes === 0) return 0;

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  return [parseFloat((bytes / Math.pow(k, i)/10).toFixed(dm)), sizes[i]];
  }
}