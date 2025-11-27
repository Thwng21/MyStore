// Hàm helper để tô màu status code
function colorStatus(status) {
  if (status >= 200 && status < 300) return `\x1b[32m${status}\x1b[0m`; // xanh
  if (status === 202) return `\x1b[33m${status}\x1b[0m`; // vàng
  if (status >= 400) return `\x1b[31m${status}\x1b[0m`; // đỏ
  return status; // giữ mặc định
}

module.exports = { colorStatus };
