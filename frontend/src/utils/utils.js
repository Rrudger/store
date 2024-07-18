import { lowerCase, trim, upperCase } from 'lodash';

const setLocalStorage = (token, id, role, name) => {
  localStorage.setItem('token', token);
  localStorage.setItem('id', id);
  localStorage.setItem('role', role);
  localStorage.setItem('userName', name);
}

const getPriceStr = ( intVal, fractVal, cur ) => {
  const curList = {
    EUR: '\u20ac',
    USD: '\u0024',
    BHD: '\u00A4',
    CHF: '\u20a3',
    GBP: '\u00A3',
    GIP: '\u00A3',
    JPY: '\u00A5',
    OMR: '\ufdfc',
    RUB: '\u20bd',
    TRY: '\u20ba',
  };
  const int = Number(intVal);
  const fract = Number(fractVal);
  if (int === 0 && fract === 0 ) return `0 ${curList[upperCase(cur)]}`
  return `${int}.${fract === 0 ? '00' : fract} ${curList[upperCase(cur)]}`
};

const getPriceStrNoCur = ( intVal, fractVal ) => {
  const int = Number(intVal);
  const fract = Number(fractVal);
  if (int === 0 && fract === 0 ) return `0`
  return `${int}.${fract === 0 ? '00' : fract}`
};

const getProduct = (int, fract, quantity) => {
  const price = Number(`${int}.${fract}`);
  const amount = (price * quantity)
  .toFixed(2)
  .toString()
  .split('.');
  return {
    int: amount[0],
    fract: amount[1],
  };
};

const getSum = (int1, fract1, int2, fract2) => {
  const subResult = Number(`${int1}.${fract1}`) + Number(`${int2}.${fract2}`);
  const result = subResult
  .toFixed(2)
  .toString()
  .split('.');
  return {
    int: result[0],
    fract: result[1],
  }
}

const sortByName = (list) => {
  return Object.keys(list).sort((a, b) => {
    const aItem = lowerCase(list[a]['name']);
    const bItem = lowerCase(list[b]['name']);
    if (aItem > bItem) return 1;
    if (aItem == bItem) return 0;
    if (aItem < bItem) return -1;
  });
}

const sortByQuantity = (attr, list) => {
  return Object.keys(list).sort((a, b) => {
    const aItem = list[a][attr];
    const bItem = list[b][attr];
    if (aItem > bItem) return 1;
    if (aItem == bItem) {
      const aName = lowerCase(list[a]['name']);
      const bName = lowerCase(list[b]['name']);
      if (aName > bName) return 1;
      if (aName == bName) return 0;
      if (aName < bName) return -1;
    };
    if (aItem < bItem) return -1;
  });
};

const sortByPrice = (list) => {
  return Object.keys(list).sort((a, b) => {
    const aItem = list[a]['price_eur'];
    const bItem = list[b]['price_eur'];
    if (aItem > bItem) return 1;
    if (aItem < bItem) return -1;
    if (aItem == bItem) {
      const aCents = list[a]['price_cent'];
      const bCents = list[b]['price_cent'];
      if (aCents > bCents) return 1;
      if (aCents < bCents) return -1;
      if (aCents == bCents) {
        const aName = lowerCase(list[a]['name']);
        const bName = lowerCase(list[b]['name']);
        if (aName > bName) return 1;
        if (aName == bName) return 0;
        if (aName < bName) return -1;
      };
    };

  });
};

const sortByTime = (list) => {
  return Object.keys(list).sort((a, b) => {
    const aItem = list[a]['created_at'];
    const bItem = list[b]['created_at'];
    if (aItem > bItem) return 1;
    if (aItem < bItem) return -1;
    if (aItem == bItem) return 0;

  });
}

const sortBy = (attr, order, list) => {
  if (order === 'asc') {
    if (attr === 'name') return sortByName(list);
    if (attr === 'price') return sortByPrice(list);
    if (attr === 'time') return sortByTime(list);
    return sortByQuantity(attr, list);
  }
  if (attr === 'name') return sortByName(list).reverse();
  if (attr === 'price') return sortByPrice(list).reverse();
  if (attr === 'time') return sortByTime(list).reverse();
  return sortByQuantity(attr, list).reverse();

};

const normalize = (value) =>  trim(value, ' ').toLowerCase();

const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('role');
  localStorage.removeItem('userName');
}


export {
  getPriceStr,
  getPriceStrNoCur,
  getProduct,
  getSum,
  logOut,
  normalize,
  setLocalStorage,
  sortBy,
}
