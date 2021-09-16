'use strict';

// Initial conditions
function start() {
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  document.querySelector('#name--0').textContent = 'Player 1';
  document.querySelector('#name--1').textContent = 'Player 2';
  const button = document.querySelector('.btn--roll');
  button.disabled = false;
}

start();

let active_player = 0;
let player_0_current = document.querySelector('#current--0');
let player_1_current = document.querySelector('#current--1');
let player_0_total = document.querySelector('#score--0');
let player_1_total = document.querySelector('#score--1');

function set_image(dice_number) {
  let image_url = `dice-${dice_number}.png`;
  document.querySelector('img').setAttribute('src', image_url);
}

// rolling dice
document.querySelector('.btn--roll').addEventListener('click', function () {
  let dice_number = Number(Math.round(Math.random() * 5) + 1);
  set_image(dice_number);

  //   Switching player if dice is 1
  if (dice_number === 1) {
    active_player === 0
      ? ((active_player = 1), (player_0_current.textContent = 0))
      : ((active_player = 0), (player_1_current.textContent = 0));
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
  } else {
    active_player == 0
      ? (player_0_current.textContent =
          dice_number + Number(player_0_current.textContent))
      : (player_1_current.textContent =
          dice_number + Number(player_1_current.textContent));
  }
});

// Holding score

document.querySelector('.btn--hold').addEventListener('click', function () {
  active_player == 0
    ? ((player_0_total.textContent =
        Number(player_0_current.textContent) +
        Number(player_0_total.textContent)),
      (active_player = 1))
    : ((player_1_total.textContent =
        Number(player_1_current.textContent) +
        Number(player_1_total.textContent)),
      (active_player = 0));

  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  player_0_current.textContent = 0;
  player_1_current.textContent = 0;

  //   check if any one won
  let player1 = Number(player_0_total.textContent);
  let player2 = Number(player_1_total.textContent);
  if (player1 >= 20) {
    document.querySelector('#name--0').textContent = 'WON';
    const button = document.querySelector('.btn--roll');
    button.disabled = true;
  } else if (player2 >= 20) {
    document.querySelector('#name--1').textContent = 'WON';
    const button = document.querySelector('.btn--roll');
    button.disabled = true;
  }
});

// New game

document.querySelector('.btn--new').addEventListener('click', function () {
  start();
});
