
/* The code is creating a React element for a heading and a button, and then rendering them to the DOM. */
const heading = React.createElement("h1", {
    id: "title",
    className: "heading",
}, "hyy devs");

const button = React.createElement("button", {
    id: "btn",
    onClick: handleClick
}, "click me");

const handleClick = () => console.log("we did it!!");
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render([heading, button]);
