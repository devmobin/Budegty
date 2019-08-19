import Expense from "../models/Expense";
import Income from "../models/Income";

let Data = {
  allItems: {
    exp: [],
    inc: []
  },
  totals: {
    exp: 0,
    inc: 0
  },
  budget: 0,
  percentage: -1
};

const getBudget = function() {
  return {
    budget: Data.budget,
    totalInc: Data.totals.inc,
    totalExp: Data.totals.exp,
    percentage: Data.percentage
  };
};

const addItem = function(type, description, value) {
  let newItem, ID;
  // create a id for item
  if (Data.allItems[type].length > 0) {
    ID = Data.allItems[type][Data.allItems[type].length - 1].id + 1;
  } else {
    ID = 0;
  }

  // create the item
  if (type === "exp") {
    newItem = new Expense(ID, description, value);
  } else if (type === "inc") {
    newItem = new Income(ID, description, value);
  }

  // push item to the data
  Data.allItems[type].push(newItem);
  return newItem;
};

// calculate totals : income and expense
const calculateTotals = function(type) {
  let sum = 0;
  Data.allItems[type].forEach(current => {
    sum += current.value;
  });
  Data.totals[type] = sum;
};

// calculate the budget
const calculateBudget = function() {
  // calculate totals : income and expense
  calculateTotals("exp");
  calculateTotals("inc");

  // calculate the budget : income - expense
  Data.budget = Data.totals.inc - Data.totals.exp;

  // calculate the percentage
  if (Data.totals.inc > 0) {
    Data.percentage = Math.round((Data.totals.exp / Data.totals.inc) * 100);
  } else {
    Data.percentage = -1;
  }
};

// get all percentages to calculate
const getPercentages = function() {
  calculatePercentages();
  return Data.allItems.exp.map(current => current.getPercentage());
};

// calculate the percentages
const calculatePercentages = function() {
  // calculate all the percentages for all items
  Data.allItems.exp.forEach(current => {
    current.calculatePercentage(Data.totals.inc);
  });
};

// delete item from data
const deleteItem = function(type, id) {
  let ids = Data.allItems[type].map(current => current.id);
  let index = ids.indexOf(id);
  if (index !== -1) {
    Data.allItems[type].splice(index, 1);
  }
};

export default {
  getBudget,
  addItem,
  deleteItem,
  calculateBudget,
  getPercentages
};
