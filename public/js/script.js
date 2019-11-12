
//Add Input
var j = 3;

function addItem() {
    if (j > 10) {
        alert('Cannot Add more than 10 Items');
        return false;
    }
    var Product = document.createElement('INPUT');
    Product.classList.add("form-control");
    Product.classList.add("mt-3")
    Product.setAttribute("id", j);
    Product.setAttribute("name", "item");
    Product.setAttribute("placeholder", "Enter Name for Item " + j);
    var Item = document.getElementById('item');
    Item.appendChild(Product);
    var Quantity = document.createElement('INPUT');
    Quantity.classList.add("form-control");
    Quantity.classList.add("mt-3")
    Quantity.setAttribute("id", j);
    Quantity.setAttribute("name", "quantity");
    Quantity.setAttribute("placeholder", "Enter Quantity for Item " + j);
    var node = document.getElementById('quantity');
    node.appendChild(Quantity);
    var Rate = document.createElement('INPUT');
    Rate.classList.add("form-control");
    Rate.classList.add("mt-3")
    Rate.setAttribute("id", j);
    Rate.setAttribute("name", "rate");
    Rate.setAttribute("placeholder", "Enter Rate for Item " + j);
    var node = document.getElementById('rate');
    node.appendChild(Rate);
    j++;
}

function deleteItem() {
    if (j > 1) {
        var quantity = document.getElementById('quantity');
        var items = document.getElementById('items');
        var rate = document.getElementById('rate');
        quantity.removeChild(quantity.childNodes[j]);
        rate.removeChild(rate.childNodes[j]);
        items.removeChild(items.childNodes[j]);
        j--;
    }
}