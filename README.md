# Frontend Mentor - Connect Four game solution

This is a solution to the [Connect Four game challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/connect-four-game-6G8QVH923s).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Built with ReactJS, this project is a connect four game that allows human player vs. human player gameplay (alternating turns on the same computer). The project was a Frontend Mentor challenge with the goal of building the game and getting it as close to the provided design specs as possible. While the player vs. player version is complete, Player vs. CPU mode will be in version 2 of the project.

Users should be able to:

- View the game rules
- Play a game of Connect Four against another human player (alternating turns on the same computer)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- See the discs animate into their position when a move is made

### Screenshot

![](/connect_four_thumb.png)

### Links

- Solution URL: [https://github.com/MSPayneII/FEM_Connect_Four](https://github.com/MSPayneII/FEM_Connect_Four)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS
- [React](https://reactjs.org/) - JS library

### What I learned

Utilizing the CSS Pseudo Elements "::before" and "::after" allowed me to create the gameboard, which consists of a black/shadow layer, a layer of 42 individual cells (one for each board slot), and the white/top layer. I set the z-index of the top layer to one and pointer events to none. With this in place, users can click on slots on the board even though they are in the middle layer. It also creates the effect of the game pieces showing behind the top layer of the board. See code snippet and accompanying figure.

To create the drop animation, I calculated the heights of the unplaced game piece at the top of a column and the height of the first available row. Next, I subtracted those heights to get the difference and used that information to update the game piece's drop animation using the transform and offset properties. I added a little bounce at the end of each drop to make it more realistic. Shout out to Thomas Campbell on Youtube for this animation approach.

```css
.gameboard {
  display: grid;
  place-content: center;
  grid-template-columns: repeat(7, 2.91rem);
  grid-template-rows: repeat(6, 2.93rem);
  width: 20.9375rem;
  height: 19.375rem;
  margin: 0 auto;
  padding-bottom: 1rem;
  background: transparent;
}

.gameboard::before {
  content: "";
  background: url("../src/assets/images/board-layer-black-small.svg") no-repeat;
  position: absolute;
  width: 20.9375rem;
  height: 20.375rem;
}

.gameboard::after {
  content: "";
  background: url("../src/assets/images/board-layer-white-small.svg") no-repeat;
  position: absolute;
  width: 20.9375rem;
  height: 19.375rem;
  z-index: 1;
  pointer-events: none;
}
```

The drop animation came from Thomas Campbell

```js
const gamePieceDropAnimation = (gamePiece, pieceDropHeight) => {
  // sets the game piece drop animation

  gamePiece.animate(
    [
      { transform: `translateY(${pieceDropHeight}px)`, offset: 0 },
      { transform: `translateY(0px)`, offset: 0.6 },
      { transform: `translateY(${pieceDropHeight / 30}px)`, offset: 0.8 },
      { transform: `translateY(0px)`, offset: 0.95 },
    ],
    {
      duration: 600,
      easing: "linear",
      iterations: 1,
    }
  );
};
```

### Continued development

In this project, I attempted the player vs. CPU mode and was able to get the computer to make moves, but it was buggy. I'm currently researching online research and watching tutorials to learn more about artificial intelligence and incorporate it into future game-based projects.

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Michael S. Payne II](https://michaelspayneii.com/index.html)
- Frontend Mentor - [@MSPayneII](https://www.frontendmentor.io/profile/MSPayneII)
