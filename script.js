"use strict";

const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

// Store listItems
const listItems = [];

let dragStartIndex;

// Drag functions
const dragStart = function () {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
};

const dragOver = function (e) {
  e.preventDefault();
};

const dragEnter = function () {
  this.classList.add("over");
};

const dragLeave = function () {
  this.classList.remove("over");
};

// Swap list items drg & drop
const swapItems = function (fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
};

const dragDrop = function () {
  const dragEndIndex = +this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
};

// Check the order
const checkOrder = function () {
  listItems.forEach((listItem, indx) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[indx]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
};

// addEventListener
const addEventListeners = function () {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
};

// List items to DOM
const createList = function () {
  [...richestPeople]
    .map((a) => ({
      value: a,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
	<span class="number">${index + 1}</span>
  <div class='draggable' draggable='true'>
  <p class='person-name'>${person}</p>
  <i class='fas fa-grip-lines'></i>
  </div>
	`;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
};

createList();

// Check the order - addEventListener
check.addEventListener("click", checkOrder);
