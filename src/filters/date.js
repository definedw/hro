export default function (date, format) {
  if (date == null) {
    return 'unkown time'
  }
  if (date.length === 0 || date == 0) {
    return ''
  }
  if (format == null) {
    format = 'dd/MM/yyyy'
  }

  const t = new Date(date)
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (sign) {
    switch (sign) {
      case 'yyyy':
        return timeFormat(t.getFullYear())
      case 'MM':
        return timeFormat(t.getMonth() + 1)
      case 'mm':
        return timeFormat(t.getMinutes())
      case 'dd':
        return timeFormat(t.getDate())
      case 'HH':
        return timeFormat(t.getHours())
      case 'ss':
        return timeFormat(t.getSeconds())
    }
  })
}
function timeFormat(i) {
  return (i < 10 ? '0' : '') + i
}
