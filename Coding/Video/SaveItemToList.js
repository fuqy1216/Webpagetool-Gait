function myListAdditions() {

//Defining a listener for our button, specifically, an onclick handler document.getElementById("add").onclick = function() {
//First things first, we need our text:

    var text = document.getElementById("idea").value; // gets input values

//Now construct a quick list element
//    var li = "<li>" + text + "</li>";

//Now use appendChild and add it to the list!
//    document.getElementById("list").appendChild(li);

var node = document.createElement("LI");
var textnode = document.createTextNode(text);
node.appendChild(textnode);
document.getElementById("list").appendChild(node);
}
