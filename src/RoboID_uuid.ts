const alphabet = '0123456789ABCDEF';

export function genUUID(type = 'S') {
  const t = time(Date.now());
  const r = rand();
  switch (type) {
    case 'L':
      return `${t}-${r}`;
    case 'X':
      const x = rand();
      return `${t}-${r}-${x}`;
    default:
      return `${t}-${r.substring(0, 8)}`;
  }
}

function time(data = 0) {
  let result = '';

  while (data > 0) {
    const q = data % 16;
    data = Math.floor(data / 16);
    result += alphabet[q];
  }

  result = result.padEnd(12, '0');
  const rev = result.split("").reverse();
  return rev.slice(0, 8).join("") + '-' + rev.slice(8).join("");
}

function rand(len = 20) {
  if (len <= 0) return '';
  const arr = new Int8Array(len);
  crypto.getRandomValues(arr);

  let result = 'B';   // UUID version
  for (let i = 1; i < len; i++) {
    const x = arr[i] & 0x0f;
    result += alphabet[x];
  }
  const first = result.substring(0, 4) + '-' + result.substring(4, 8);
  const second = result.substring(8);

  return second ? first + '-' + second : first;
}
