import options from './options.js';

const shuffle = array => array.toSorted(() => Math.random() - 0.5);

const N = 5;
const temp = shuffle(options).slice(0, N * N);

// если лежит что-то в localStorage, то берем оттуда
const stored = localStorage.getItem('bingo');
if (!stored) {
  localStorage.setItem('bingo', JSON.stringify(temp));
}
const variants = stored ? JSON.parse(stored) : temp;

const root = document.querySelector('.bingo__grid');

const checkBingo = () => {
  const checked = document.querySelectorAll('.bingo__item._checked');
  if (checked.length < N) {
    return;
  }
  const iterator = Array.from({ length: N }, () => false);

  // rows
  iterator.forEach((_, i) => {
    const test = document.querySelectorAll('.bingo__item._checked[data-row="' + i + '"]');
    if (test.length === N) {
      test.forEach(item => item.classList.add('_bingo'));
    }
  });

  // cols
  iterator.forEach((_, i) => {
    const test = document.querySelectorAll('.bingo__item._checked[data-col="' + i + '"]');
    if (test.length === N) {
      test.forEach(item => item.classList.add('_bingo'));
    }
  });

  // diagonals
  const primary = iterator.map((_, i) => document.querySelector('.bingo__item._checked[data-row="' + i + '"][data-col="' + i + '"]')).filter(e => e);
  const secondary = iterator.map((_, i) => document.querySelector('.bingo__item._checked[data-row="' + i + '"][data-col="' + (N - i - 1) + '"]')).filter(e => e);
  if (primary.length === N) {
    primary.forEach(item => item?.classList.add('_bingo'));
  }
  if (secondary.length === N) {
    secondary.forEach(item => item?.classList.add('_bingo'));
  }
}

variants.forEach((variant, index) => {
  const div = document.createElement('div');
  div.className = "bingo__item";
  div.innerHTML = variant;
  div.dataset.index = index.toString();
  div.dataset.row = Math.floor(index / N).toString();
  div.dataset.col = (index % N).toString();
  div.addEventListener('click', () => {
    div.classList.toggle('_checked');
    checkBingo();
  });
  root?.appendChild(div);
});

