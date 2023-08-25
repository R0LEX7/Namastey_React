
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
