export const getImages = (lang) => {
  const imgRoot = 'default/';
  const img = (path) => `${imgRoot}${path}`;

  const range = (start, end, step = 1) => {
    if (undefined === end) { end = start; start = 0; step = 1; }
      
    const rv = [];
    for (let i = start; i < end; i+= step) rv.push(i);
    return rv;
  };  

  return {
    Background: img('background.png'),
    BigNums: range(10).map(v => img(`BigNum/${v}.png`)),
		Buttons: {
			...range(10).map(v => img(`Buttons/${v}.png`)),
			Divide: img('Buttons/divide.png'),
			Dot: img('Buttons/dot.png'),
			Equals: img('Buttons/equals.png'),
			Minus: img('Buttons/minus.png'),
			Mode: img('Buttons/mode.png'),
			Multiply: img('Buttons/multiply.png'),
			Plus: img('Buttons/plus.png')
		},
    Colon: img('BigNum/colon.png'),
    Negative: img('negative.png'),
    Dot: img('dot.png'),
		Error: img('error.png'),
		Overflow: img('overflow.png')
  }
}
