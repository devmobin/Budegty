import UIController from "./controllers/ui";
import BudgetController from "./controllers/budget";
import ui from "./controllers/ui";

// access to DOM strings
const DOM = UIController.getDOMStrings();

// initial the EventListeners and the app
$(document).ready(function() {
  UIController.displayDate();
  setupEventListeners();
  UIController.displayBudget({
    budget: 0,
    totalInc: 0,
    totalExp: 0,
    percentage: -1
  });
});

// update percentages of the budget
const updatePercentages = function() {
  // get all the percentages
  let percentages = BudgetController.getPercentages();
  // display them
  UIController.displayPercentages(percentages);
};

// update the budget data
const updateBudget = function() {
  // calculate the budget data
  BudgetController.calculateBudget();

  // show the budget and update the UI
  let budget = BudgetController.getBudget();
  UIController.displayBudget(budget);

  // update the percentages
  updatePercentages();
};

// the function of add button
const ctrlAddItem = function() {
  // get the user input
  let input = UIController.getInput();

  if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
    // save item to the budget data
    let newItem = BudgetController.addItem(
      input.type,
      input.description,
      input.value
    );

    // show item on the user interface
    UIController.addListItem(newItem, input.type);

    // clear user inputs
    UIController.clearFields();

    // update the budget data
    updateBudget();
  }
};

// function of the deleting items
const ctrlDeleteItem = function(event) {
  let target = $(event.target);
  if (target.is(DOM.deleteItemBtn)) {
    // get the type and id of item
    let item = target.parents("div.item").attr("id");
    let type = item.split("-")[0];
    let itemID = +item.split("-")[1];

    // delete item from data in the budget
    BudgetController.deleteItem(type, itemID);

    // remove item from the UI
    UIController.deleteListItem(item);

    // update and show the budget
    updateBudget();
  }
};

// setup all EventListeners
const setupEventListeners = function() {
  // add button or enter key pressed
  $(DOM.inputButton).click(ctrlAddItem);
  $(document).keypress(function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
  // delete items
  $(DOM.container).click(ctrlDeleteItem);
  $(DOM.inputType).change(UIController.changedType);
};
