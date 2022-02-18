import { cloneDeep } from "lodash";



const SPADES = "spades";
const HEARTS = "hearts";
const CLUBS = "clubs";
const DIAMONDS = "diamonds";

const cards = [
  {
    name: "A",
    values: [1, 11]
  },
  {
    name: "K",
    values: [10]
  },
  {
    name: "Q",
    values: [10]
  },
  {
    name: "J",
    values: [10]
  },
  {
    name: "10",
    values: [10]
  },
  {
    name: "9",
    values: [9]
  },
  {
    name: "8",
    values: [8]
  },
  {
    name: "7",
    values: [7]
  },
  {
    name: "6",
    values: [6]
  },
  {
    name: "5",
    values: [5]
  },
  {
    name: "4",
    values: [4]
  },
  {
    name: "3",
    values: [3]
  },
  {
    name: "2",
    values: [2]
  }
];

let spades = [];
cards.forEach(card => {
  const newObj = cloneDeep(card);
  newObj.type = SPADES;
  spades.push(newObj);
});

let clubs = [];
cards.forEach(card => {
  const newObj = cloneDeep(card);
  newObj.type = CLUBS;
  clubs.push(newObj);
});

let diamonds = [];
cards.forEach(card => {
  const newObj = cloneDeep(card);
  newObj.type = DIAMONDS;
  diamonds.push(newObj);
});

let hearts = [];
cards.forEach(card => {
  const newObj = cloneDeep(card);
  newObj.type = HEARTS;
  hearts.push(newObj);
});

const availableCards = spades.concat(hearts, clubs, diamonds);

export default availableCards;
