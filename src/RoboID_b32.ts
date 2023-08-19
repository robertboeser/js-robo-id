const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

export function genID32(type = 'S') {
  const t = time(Date.now());
  const r = rand();
  switch (type) {
    case 'L':
      return `${t}-${r}`;
    case 'X':
      const x = rand();
      return `${t}-${r}-${x}`;
    default:
      return `${t}-${r.substring(0, 6)}`;
  }
}

function time(data = 0) {
  let result = '';

  while (data > 0) {
    const q = data % 32;
    data = Math.floor(data / 32);
    result += alphabet[q];
  }

  result = result.padEnd(9, '0');
  return result.split("").reverse().join("");
}

function rand(len = 16) {
  if (len <= 0) return '';
  const arr = new Int8Array(len);
  crypto.getRandomValues(arr);

  let result = '';
  for (let i = 0; i < len; i++) {
    const x = arr[i] & 0x1f;
    result += alphabet[x];
  }

  return result;
}
