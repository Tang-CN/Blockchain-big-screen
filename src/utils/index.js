export function dateDispose(dateStr) {
  //例 "2023-07-11";
  const separatorIndex = dateStr.indexOf('-')
  if (separatorIndex !== -1) {
    dateStr = dateStr.slice(separatorIndex + 1)
  }
  // 输出 "07-11"
  return dateStr
}
