function isValidated() {
  console.log("Running isValidated function")
   
  const itemInput = document.getElementById('item-input').value.trim();
  const categorySelect = document.getElementById('category-select').value;

  const isValid = itemInput.length > 0 && categorySelect !== '';

  if (itemInput.length === 0) {
    document.getElementById('item-input').classList.add('border-red-500');
    document.getElementById('item-input').classList.remove('border-green-600');
} else {
    document.getElementById('item-input').classList.remove('border-red-500');
    document.getElementById('item-input').classList.add('border-green-600');
}

if (categorySelect === '') {
    document.getElementById('category-select').classList.add('border-red-500');
    document.getElementById('category-select').classList.remove('border-green-600');
} else {
    document.getElementById('category-select').classList.remove('border-red-500');
    document.getElementById('category-select').classList.add('border-green-600');
}
  return isValid;
}

function add() {
  console.log("Running add function");
  if (!isValidated()) {
    return;
  } else {
    console.log("Invalid inputs");
  }

  const item = document.getElementById('item-input').value.trim();
  const category = document.getElementById('category-select').value;

  const newListitem = document.createElement('li');
  newListitem.className = 'mt-2 p-2 font-semibold';

  const span1 = document.createElement('span');
  span1.textContent = '➡️';

  const span2 = document.createElement('span');
  span2.textContent = item;

  const span3 = document.createElement('span');
  switch (category) {
    case 'movie':
      span3.className = "ml-2 p-2 rounded-lg bg-pink-400";
      span3.textContent = "Movie";
      break;
    case 'documentary':
      span3.className = "ml-2 p-2 rounded-lg bg-yellow-300";
      span3.textContent = "Documentary";
      break;
    case 'animation':
      span3.className = "ml-2 p-2 rounded-lg bg-green-600";
      span3.textContent = "Animation";
      break;
    default:
      break;
  }
  const newItem = {
    name: item,
    category: category,
  };
  list.push(newItem);

  const jsonString = JSON.stringify(list);
  localStorage.setItem("list", jsonString);

  newListitem.appendChild(span1);
  newListitem.appendChild(span2);
  newListitem.appendChild(span3);

  document.getElementById('list-items').appendChild(newListitem);

  document.getElementById('item-input').value = '';
  document.getElementById('category-select').value = '';
}

const listFormStorage = localStorage.getItem("list");
let list = [];

if (listFormStorage) {
  list = JSON.parse(listFormStorage);
  for (let i = 0; i < list.length; i++) {
    let item = list[i];

    const newListitem = document.createElement('li');
    newListitem.className = 'mt-2 p-2 font-semibold';

    const span1 = document.createElement('span');
    span1.textContent = '➡️';

    const span2 = document.createElement('span');
    span2.textContent = item.name;

    const span3 = document.createElement('span');
    switch (item.category) {
      case 'movie':
        span3.className = "ml-2 p-2 rounded-lg bg-pink-400";
        span3.textContent = "Movie";
        break;
      case 'documentary':
        span3.className = "ml-2 p-2 rounded-lg bg-yellow-300";
        span3.textContent = "Documentary";
        break;
      case 'animation':
        span3.className = "ml-2 p-2 rounded-lg bg-green-600";
        span3.textContent = "Animation";
        break;
      default:
        break;
    }

    newListitem.appendChild(span1);
    newListitem.appendChild(span2);
    newListitem.appendChild(span3);

    document.getElementById('list-items').appendChild(newListitem);
  }
}

document.querySelector("#submit").addEventListener("click", function(e) {
  e.preventDefault();
  isValidated();
  add();
});

document.querySelector("#list-items").addEventListener("click", function(e) {
  if (e.target.tagName === "SPAN") {
    console.log("clicked on emoji");
    const listItem = e.target.parentNode;
    listItem.remove();

    let parent = document.querySelector("#list-items");
    let childrenArray = Array.from(parent.children);
    let index = childrenArray.indexOf(listItem);
    list.splice(index, 1);

    const jsonString = JSON.stringify(list);
    localStorage.setItem("list", jsonString);
  }
});