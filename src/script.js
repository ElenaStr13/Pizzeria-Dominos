//Початкова вартість та Масив радіо.
const startPizzaPrice = 50;
let pizzaPrice = 0;
const [...pizzaSize] = document.querySelectorAll(".radioIn");

//ціни на соуси та топінги
let soucePrice = 0,
  toppingPrice = 0,
  fullPrice = 0,
  [...ingridiends] = document.querySelectorAll(".ingridients >img");
const price = document.querySelector(".price>p"),
  sauces = document.querySelector(".sauces>p"),
  topings = document.querySelector(".topings>p");

//Функція розрахунку вартості залежно від розміру піци.
function firstCalc(id) {
  switch (id) {
    case "small": {
      pizzaPrice = startPizzaPrice + soucePrice + toppingPrice;
      break;
    }
    case "mid": {
      pizzaPrice = 1.5 * (startPizzaPrice + soucePrice + toppingPrice);
      break;
    }
    case "big": {
      pizzaPrice = 2 * (startPizzaPrice + soucePrice + toppingPrice);
      break;
    }
  }
};

//функція розрахунку ціни на піцу
function calc() {
  pizzaSize.forEach((el) => {
    if (el.checked == true) firstCalc(el.id);
  });
  fullPrice = pizzaPrice;
  price.innerHTML = "Ціна: " + fullPrice + "грн.";
};

const changePizza = document.querySelector("#pizza");
changePizza.addEventListener("click", () => {
  calc();
  mainPizzaFieldImg.length = ingrid.length;
});

//початкові дані для переносу елементу
const mainPizzaField = document.querySelector(".table");
let droppableBelow = null,
  elemBelow = null,
  moveEl = null,
  dragEl = null,
  [...mainPizzaFieldImg] = document.querySelectorAll(".table>img"),
  [...ingrid] = document.querySelectorAll(".table>img");


//Перетягування елементу
document.querySelector(".ingridients").addEventListener("mousedown", function (e) {
  moveEl = e.target;

  if (moveEl.tagName != "IMG") return;
  moveEl.value = document.querySelector(`#${moveEl.id}+span`).innerText;

  dragEl = moveEl.cloneNode(true);
  dragEl.value = moveEl.value;

  let shiftX = e.clientX - document.querySelector(".ingridients").getBoundingClientRect().left;
  let shiftY = e.clientY - document.querySelector(".ingridients").getBoundingClientRect().top;

  dragEl.style.position = "absolute";
  dragEl.style.zIndex = 100;
  document.body.append(dragEl);
  moveAt(e.pageX, e.pageY);

  //перенос об'єкту по координатам (pageX, pageY)
  function moveAt(pageX, pageY) {
    dragEl.style.left = pageX - shiftX + 'px';
    dragEl.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    dragEl.hidden = true;
    elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    dragEl.hidden = false;
  }
  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", onMouseMove);

    // потенційні цілі переносу класу table (droppable)
    let droppableBelow = elemBelow.closest('.table');

    if (droppableBelow) {
      dragEl.style.display = "inline-block";
      mainPizzaField.append(dragEl);
      dragEl.style.left = 0 + "px";
      dragEl.style.top = 0 + "px";
      [...ingrid] = document.querySelectorAll(".table>img");
      e.stopPropagation();
    };
    //let changeForLost = true;
  });
  document.ondragstart = function () {
    return false;
  };

  //видалення елементу
  const results = document.querySelector(".result");
  results.addEventListener("click", (element) => {
    if (e.target.className == "draggable") {
      console.log(element);
      let id = dragEl.id;
      //let spanEl = dragEl.getAttribute("alt");
      console.log("spanEl:" + spanEl);
      spanText = document.querySelector(`#${id}+span`).innerHTML;
      if (spanText == "Кетчуп" || spanText == "BBQ" || spanText == "Рiкотта") {
        soucePrice -= 10;
        let sauceEl = document.querySelector(".sauces>p").innerHTML;
        console.log("sauceE:" + sauceEl);

        if (sauceEl.includes(spanText)) {
          sauceEl = sauceEl.replaceAll(spanText, "");
          document.querySelector(".sauces>p").innerHTML = sauceEl;
          /*  if (spanText == spanEl) {
             dragEl.remove();
           }*/

        } else {
          sauceEl = sauceEl.replaceAll(spanText, "");
          document.querySelector(".sauces>p").innerHTML = sauceEl;
          /* if (spanText == spanEl) {
            dragEl.remove();
          }*/
        }
        if (document.querySelector(".sauces>p").innerHTML == "Соуси:") {
          secondSauce = false;
        }
        firstCalc();
        calc();
      } else if (spanText == "Сир звичайний" || spanText == "Сир фета" || spanText == "Моцарелла" || spanText == "Телятина" || spanText == "Помiдори" || spanText == "Гриби") {
        toppingPrice -= 15;
        let topingEl = document.querySelector(".topings>p").innerHTML;

        if (topingEl.includes(spanText)) {
          topingEl = topingEl.replaceAll(spanText, "");
          document.querySelector(".topings>p").innerHTML = topingEl;
          /*  if (spanText == spanEl) {
             dragEl.remove();
           }*/

        } else {
          topingEl = topingEl.replaceAll(spanText, "");
          document.querySelector(".topings>p").innerHTML = topingEl;
        }
        /*if (spanText == spanEl) {
         dragEl.remove();
       }*/
        if (document.querySelector(".topings>p").innerHTML == "Топінги:") {
          secondToping = false;
        }
        firstCalc();
        calc();
      }
    }
  });

  //перенос тексту та ціни соусу/топінгу при переносі елементу 
  let id = dragEl.id,
    secondSauce = false,
    secondToping = false,
    spanText = document.querySelector(`#${id}+span`).innerHTML;

  if (spanText == "Кетчуп" || spanText == "BBQ" || spanText == "Рiкотта" && secondSauce == true) {
    if (secondSauce) {
      document.querySelector(".sauces>p").append(", " + spanText);
    } else {
      document.querySelector(".sauces>p").append(" " + spanText);
      secondSauce = true;
    }
    soucePrice += 10;
    firstCalc();
    calc();

  } else {
    if (secondToping) {
      document.querySelector(".topings>p").remove(", " + spanText);
    } else {
      document.querySelector(".topings>p").append(" " + spanText);
      secondToping = true;
    }
    toppingPrice += 15;
    firstCalc();
    calc();
  }
  return false;
});

//видалення картинки, якщо вона не попала на корж піци
let changeForLost = true;

window.document.addEventListener("dblclick", (e) => {
  let dell = false;
  if (e.target.tagName === "IMG" && changeForLost == true) {
    let elementDell = e.target;
    var a = document.querySelector(`#${e.target.id}+span`).innerHTML;

    if (elementDell.closest(".table")) return;
    elementDell.remove();
    let [...sauce] = document.querySelectorAll(".sauces>p"),
      [...topin] = document.querySelectorAll(".topings>p"),
      spans = [...sauce, ...topin],
      ingridOrder = [];

    spans.forEach((el) => {
      if (el.innerText != "") {
        ingridOrder += el.innerText;
        console.log('ingridOrder:' + ingridOrder);
        console.log(dell);
        if (dell) return;
        console.log("a: " + a);
        if (a.includes(ingridOrder)) {
          el.remove();
          dell = true;
          console.log('ingridOrder:' + ingridOrder);
        }
      }
    });
  };
  changeForLost = false;
});


// Перевіряємо форму заповнення 
const validate = (target) => {
  switch (target.name) {
    case "name":
      return /^[A-zА-я_ ]{2,}$/i.test(target.value);
    case "phone":
      return /^\+380\d{9}$/.test(target.value);
    case "email":
      return /^[a-z._]+@[a-z._]+\.[a-z._]{1,4}$/i.test(target.value);
    default:
      throw new Error("Невірно введені дані");
  }
};

const info = document.forms.info;
//Створюємо об`єкт для зберігання
class Order {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  };

  getData() {
    const [...pizzaSize] = document.querySelectorAll(".radioIn");
    let [...sauce] = document.querySelectorAll(".sauces>p"),
      [...topin] = document.querySelectorAll(".topings>p"),
      pizza = {},
      ingridOrder = "";
    var spans = [...sauce, ...topin];
    pizzaSize.forEach((e) => {
      if (e.checked == true) {
        pizza.size = e.id;
      }
    });
    spans.forEach((e) => {
      if (e.innerText != "") {
        ingridOrder += e.innerText + ",";
      }
    });
    this.pizza = pizza;
    this.ingridOrder = ingridOrder;
  }
};

let isValide = false;
info.addEventListener("click", (el) => {
  if (el.target.name != "cansel" && el.target.name != "btnSubmit") {
    el.target.addEventListener("change", (e) => {
      isValide = validate(e.target);
      if (isValide) {
        e.target.style.backroundColor = "green";
      } else e.target.style.backroundColor = "red";
    });
  }
  if (el.target.name == "cancel") {
    let allInfo = [];
    allInfo.push(info.name);
    allInfo.push(info.phone);
    allInfo.push(info.email);
    allInfo.forEach((e) => (e.value = ""));
  }
  if (el.target.name == "btnSubmit") {
    if ((validate(info.name) && validate(info.phone), validate(info.email))) {
      let order = new Order(
        info.name.value,
        info.phone.value,
        info.email.value
      );
      order.getData();
      localStorage.order = JSON.stringify(order);
      alert("Заповнені дані виведені у localStorage");
      document.location = './thank-you.html';
    } else alert("Дані заповнені невірно");
  }
});

//рух знижки
const discountMove = document.querySelector("#banner");
discountMove.addEventListener("mouseover", (e) => {
  discountMove.style.right = Math.random() * (document.documentElement.clientWidth - e.target.offsetWidth) + 'px';
  discountMove.style.top = Math.random() * (document.documentElement.clientHeight - e.target.offsetHeight) + 'px';
  e.preventDefault();
});

