const DOMStrings = {
  inputType: ".add__type",
  inputDescription: ".add__description",
  inputValue: ".add__value",
  inputButton: ".add__btn",
  incomeContainer: ".income__list",
  expenseContainer: ".expenses__list",
  budgetLabel: ".budget__value",
  incomeLabel: ".budget__income--value",
  expenseLabel: ".budget__expenses--value",
  percentageLabel: ".budget__expenses--percentage",
  container: ".container",
  deleteItemBtn: ".ion-ios-close-outline",
  expensesPercentLabel: ".item__percentage",
  dateLabel: ".budget__title--month"
};

const getDOMStrings = function() {
  return DOMStrings;
};

// get the user input
const getInput = function() {
  return {
    type: $(DOMStrings.inputType).val(),
    description: $(DOMStrings.inputDescription).val(),
    value: parseFloat($(DOMStrings.inputValue).val())
  };
};

// show item on the UI
const addListItem = function(obj, type) {
  let html;
  if (type === "inc") {
    html = `
        <div class="item clearfix" id="inc-${obj.id}">
            <div class="item__description">${obj.description}</div>
            <div class="right clearfix">
                <div class="item__value">${formatNumbers(obj.value, type)}</div>
                <div class="item__delete">
                    <button class="item__delete--btn">
                        <i class="ion-ios-close-outline"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
    let item = $(html);
    $(DOMStrings.incomeContainer).append(item);
  } else if (type === "exp") {
    html = `
        <div class="item clearfix" id="exp-${obj.id}">
            <div class="item__description">${obj.description}</div>
            <div class="right clearfix">
                <div class="item__value">${formatNumbers(obj.value, type)}</div>
                <div class="item__percentage">21%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
        `;
    let item = $(html);
    $(DOMStrings.expenseContainer).append(item);
  }
};

// display calculated budget to the UI
const displayBudget = function(obj) {
  $(DOMStrings.budgetLabel).text(
    formatNumbers(obj.budget, obj.budget > 0 ? "inc" : "exp")
  );
  $(DOMStrings.incomeLabel).text(formatNumbers(obj.totalInc, "inc"));
  $(DOMStrings.expenseLabel).text(formatNumbers(obj.totalExp, "exp"));
  if (obj.percentage > 0) {
    $(DOMStrings.percentageLabel).text(obj.percentage + "%");
  } else {
    $(DOMStrings.percentageLabel).text("---");
  }
};

// display all the percentages
const displayPercentages = function(percentages) {
  $(DOMStrings.expensesPercentLabel).each(function(index) {
    if (percentages[index] > 0) {
      $(this).text(percentages[index] + "%");
    } else {
      $(this).text("---");
    }
  });
};

// delete item from the UI
const deleteListItem = function(id) {
  $(`#${id}`).remove();
};

// clear the input fields
const clearFields = function() {
  $(DOMStrings.inputDescription)
    .val("")
    .focus();
  $(DOMStrings.inputValue).val("");
};

// format numbers to display
const formatNumbers = function(num, type) {
  num = Math.abs(num);
  num = num.toFixed(2);
  let splitNum = num.split(".");

  let int = splitNum[0];
  if (int.length > 3) {
    int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
  }

  let dec = splitNum[1];

  return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
};

// display month to the page
const displayDate = function() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getUTCMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  $(DOMStrings.dateLabel).text(year + " " + months[month]);
};

// when the type has changed
const changedType = function() {
  $(`${DOMStrings.inputType},
     ${DOMStrings.inputValue},
     ${DOMStrings.inputDescription}`).each(function(index) {
    $(this).toggleClass("red-focus");
  });
  $(DOMStrings.inputButton).toggleClass("red");
};

export default {
  getInput,
  getDOMStrings,
  addListItem,
  displayBudget,
  deleteListItem,
  displayPercentages,
  clearFields,
  displayDate,
  changedType
};
