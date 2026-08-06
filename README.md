# The Unclickable "No" Button!

<div align="center">
  <img src="https://i.postimg.cc/pdNqPxx1/milk-and-mocha-cute.gif" alt="Cute animated illustration" width="400"/>
</div>

<p align="center">
  A fun and interactive web project that asks a simple question, but with a twist: the "No" button runs away!
</p>

<p align="center">
  <a href="https://adityapatil0122.github.io/Funny-dating-website/"><strong>➥ Try the Live Demo</strong></a>
</p>

---

## 📖 About This Project

This project is a creative and humorous take on a simple yes-or-no question. When presented with the question "Do you wanna go out with me?", the user has two choices. While the "Yes" button is straightforward, the "No" button is coded to actively evade the user's mouse cursor, making it a fun challenge to try and click it.

It's a simple but effective demonstration of how JavaScript can be used to create dynamic and interactive user experiences.

## ✨ Features

-   **Interactive UI:** A playful and engaging user interface.
-   **Dynamic Button Movement:** The "No" button randomly repositions itself on the screen whenever the mouse hovers over it.
-   **Responsive Design:** The layout and functionality work well across different screen sizes.
-   **Two-Page Flow:** A simple, two-step experience from the initial question to the "yes" confirmation page.

## 🛠️ Tech Stack

-   **HTML5:** For the basic structure and content of the pages.
-   **CSS3:** For styling, including the layout, button design, and transition effects.
-   **JavaScript:** For the core logic that makes the "No" button move dynamically around the page.

## 🚀 How It Works

The magic of this project lies in a small JavaScript function.
-   An `onmouseover` event listener is attached to the "No" button.
-   When the user's cursor hovers over the button, the `moveButton()` function is triggered.
-   This function calculates a new random `x` and `y` coordinate within the browser's window and instantly moves the button to that new position using CSS `left` and `top` properties.
-   This creates the illusion that the button is "running away" from the cursor, making it nearly impossible to click.

---


