
# Namastey React Series

Its a series to learn the working behind react also to understand it better.


# Day 01 ->  Parcel

## 1. What is Bundler?
- Bundlers are tools that are used to bundle JavaScript files and their dependencies into a single file. 
- In React, bundlers are used to combine all the JavaScript files that make up a React application into a single file that can be loaded by a web browser. 
- This is done to reduce the number of HTTP requests that a browser has to make to load a web page, which can significantly improve the performance of a React application.

## 2. What is Parcel ?
- The Parcel approach is mainly based on a zero configuration environment.
# Featurs & Advantages
- Zero configuration : start even with html and a script(js) file.
- Local Server
- HMR = Hot Module Replacement
- File Watching Algorithm - written in C++
- Caching - Faster Builds
- Image Optimization
- Minification
- Bundling
- Compress
- Consistent Hashing
- Code Splitting
- Differential Bundling - support older browsers
- Diagnostic
- Error Handling
- HTTPs
- Tree Shaking - remove unused code
- Different dev and prod bundles



## How to start with Parcel 



```bash
  npm init -y 
  npm i -D parcel-bundler
  npm i react react-dom
```
- Add scripts 
```bash
    "start" : "parcel index.html --open",
    "build" : "parcel build index.html "
```
 - In index.html
 ```bash
    <body>
    <div id = "root></div>
    <script src = "index.js"></script>
    </body>
 ``` 
 - In index.js
 ```bash
    // index.js
    import React from "react"
    import ReactDOM from "react-dom"

    const root = ReactDOM.createRoot
    (document.getElementById("root"));
    root.render(<h1>Hello world!</h1>);
 ``` 




# Day 02 -> File Structure


## 3. What is package.json file ?
- This is a JSON(javascript object notation) file that includes metadata such as "name" , "author" , version of packages , as well as Starter Scripts & dependencies.

## 4. What is package-lock.json file ?
- This is a JSON File that is Automatically Generated when we make changes to the package.json or node_modules .
- The file contains thausands of lines of code & it lists out the Exact version of all of the Dependencies needed by our Project .
- It is handled By NPM.

## 5 . What are node_modules?
- node_modules is a folder that contains hundered of folders and files that Represents the modules needed to run our project .

## 6. What are Dependencies?
- This is an object filled with all of the packages that are currently being used in our project.
example -> react and react-DOM
- It also shows the version the each package .

## 7. What are scripts ?
- The scripts allows us to run the project in your local server & will Automatically restart the server every time you make changes to a file .

## 8. What is EsLint Config ?
- EsLint is a linter that helps you to find & fix syntax errors in our code & adheres to the ECMAScript/JavaScript Standards.

## 9. What is Browser Lists ?
- In this section we can specify which Browsers are supported by our React app.
- That will aslo ensure that we can use ES6 Features in our Code & It will be supported.

# Day 03 -> Behind JavaScript

## 10. What is Babel ?
- Babel is a Compiler/Transpiler that transform the latest JavaScript features, which are not understandable to every Browser, into a backward compatible version of javascript in current & older Browser or environment.
- Both Babel & Bundler are tools use to optimize JavaScript Applications.

## 11. What is Polyfill ?
- A Polyfill is a piece of code that adds functionality to older browsers that have incompatibility issues .
- Babel includes Polyfill That includesa custom regenerator runtime & core-js.

# Day 04 Learning about React

## 12. What is React Components ?
- React apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.

- React components are JavaScript functions that return markup:
- React component names must always start with a capital letter, while HTML tags must be lowercase.

## 13. What is JSX?
- It is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.
- JSX is stricter than HTML. You have to close tags like <br />. Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a <div>...</div> or an empty <>...</> wrapper:
- React doesn’t require using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages.
- Babel compiles JSX down to React.createElement() calls.
- React.createElement() performs a few checks to help you write bug-free code but essentially it creates an object

## 14. What are Props ?
- Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen
- Props are the information that you pass to a JSX tag. For example, className, src, alt, width, and height are some of the props you can pass to an <img>
- All React components must act like pure functions with respect to their props.

## 15. What is the reconciliation algorithm?


- React compares the Virtual DOM and pre-updated Virtual DOM and only marks the sub-tree of components that are updated. This process is called diffing. The algorithm behind diffing is called Diffing algorithm.
- The reconciliation algorithm is the process React uses to update the DOM in response to changes in the component state. When a component’s state changes, React will re-render the component and its children. The reconciliation algorithm is responsible for determining what has changed in the component tree and updating the DOM accordingly.

- React uses a virtual DOM (VDOM) to represent the structure of the components in memory.The virtual DOM is a lightweight in-memory representation of the DOM, and it's used by React to compare the new state of the component tree with the previous state.
If there are any differences, React will update the real DOM to match the new state.

![Sample Image](https://res.cloudinary.com/practicaldev/image/fetch/s--1TsFuP2c--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xjqsuome198owgamcgr3.jpeg)

## 16. What is The Diffing Algorithm ?
React implements a heuristic O(n) algorithm based on two assumptions:

- Two elements of different types will produce different trees.
- The developer can hint at which child elements may be stable across different renders with a key prop.
- ## The Diffing Algorithm
- ->  When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements.
- Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch.
- When comparing two React DOM elements of the same type, React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes.

## 17. Concept of Keys 
- When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. For example, adding a key to our inefficient example above can make the tree conversion efficient:
```bash
    <ul>
    <li key="2015">Duke</li>
    <li key="2016">Villanova</li>
    </ul>

    <ul>
    <li key="2014">Connecticut</li>
    <li key="2015">Duke</li>
    <li key="2016">Villanova</li>
    </ul>
```
Now React knows that the element with key '2014' is the new one, and the elements with the keys '2015' and '2016' have just moved.

## 18. What if you pass index as keys ?
- you can pass an item’s index in the array as a key. This can work well if the items are never reordered, but reorders will be slow.

- Reorders can also cause issues with component state when indexes are used as keys. Component instances are updated and reused based on their key. If the key is an index, moving an item changes it. As a result, component state for things like uncontrolled inputs can get mixed up and updated in unexpected ways.



