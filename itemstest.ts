declare const Buffer: any;

const item = 'D6000170E8EB7680FF6F000000000000';

interface IDecode {
  id: number;
  group: number;
  excellent: any[];
  durability: number;
  luck: number;
  level: number;
  skill: number;
  options: number;
  serial: string;
  ancient: number;
}

const hexDecode = (hex: string): IDecode | false => {
  if (hex.length !== 32) {
    console.error('Supported only 32 characters hex code');
    return false;
  }

  const [_group, _options, durability, , , , , exo, _ancient] = new Buffer.from(
    hex,
    'hex'
  );

  const serial = hex.substr(6, 8);
  console.log(exo);
  const excellent = Array(6)
    .fill('')
    .map((_, index) => (exo >> index) & 0b1);
  const group = ((_group >> 4) | ((exo >> 3) & 0b10000)) >> 1;
  const id = (_group & 0b00001111) | ((_group >> 4) % 2 ? 0b10000 : 0);
  const luck = (_options >> 2) & 0b1;
  const level = (_options >> 3) & 0b1111;
  const skill = (_options >> 7) & 0b1;
  const options = (_options & 0b11) | (((exo >> 6) & 0b1) << 2);
  const ancient = _ancient & 0b100 ? 5 : _ancient & 0b1000 ? 10 : 0;

  return {
    group,
    id,
    excellent,
    durability,
    luck,
    level,
    skill,
    options,
    serial,
    ancient
  };
};

const test = hexDecode(item);

// console.table(test);

// const _ = (dec: number) => {
//   let myDec = dec;
//   if (myDec < 0) {
//     myDec = 0xffffffff + dec + 1;
//   }

//   return parseInt(myDec.toString(), 10).toString(16);
// };

const hexDec = (x: number) => {
  const hex = x.toString(16);

  return hex.length < 2 ? '0' + hex : hex;
};

interface ICreate {
  group: number;
  id: number;
  level?: number;
  dur?: number;
  exo?: number;
  luck?: 0 | 1;
  skill?: 0 | 1;
  options?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  ancient?: 0 | 4 | 10;
}

const hexCreate = ({
  group = 0,
  id = 0,
  level = 0,
  dur = 255,
  exo = 0,
  luck = 0,
  skill = 0,
  options = 0,
  ancient = 0
}: ICreate): string => {
  // const hex = new Array(13).fill('00');

  // const _id = group * 512 + id;

  // hex[0] = hexDec(_id % 256);
  // hex[1] = hexDec((level * 8) | (skill * 128) | (luck * 4) | (options & 3));
  // hex[2] = hexDec(dur);
  // hex[3] += '000000';
  // hex[4] = hexDec(
  //   (options > 3 ? ((_id & 256) >> 1) | 64 : (_id & 256) >> 1) | exo
  // );
  // hex[5] = hexDec(ancient);
  // hex[6] = '00';

  // console.log(hex);

  // return hex.join('');

  const $ItemID = group * 512 + id;
  const buf1 = $ItemID % 256;
  let buf2 = level * 8;
  buf2 |= skill * 128;
  buf2 |= luck * 4;
  buf2 |= options & 3;
  const buf3 = dur;
  const serial = '00000000';
  let buf8 = ($ItemID & 256) >> 1;
  if (options > 3) {
    buf8 |= 64;
  }
  buf8 |= exo;
  const buf9 = ancient;
  const buf10 = 0;

  return (
    hexDec(buf1) +
    hexDec(buf2) +
    hexDec(buf3) +
    serial +
    hexDec(buf8) +
    hexDec(buf9) +
    hexDec(buf10) +
    '000000000000'
  );
};

const newHex = hexCreate({
  id: 1,
  group: 2,
  level: 0,
  dur: 200,
  exo: 33,
  luck: 1,
  skill: 1,
  options: 1,
  ancient: 0
});

console.log(newHex);

console.log(hexDecode(newHex));
