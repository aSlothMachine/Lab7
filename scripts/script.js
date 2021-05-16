// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;


// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
} // Code used from Lab# 7 documentation of service workers


//query selector for settings and header:
const settingsPage = document.querySelector('img');
const homePage = document.querySelector('h1');
// const childEntry = document.querySelector('entry-page');

// User clicks the settings icon:
settingsPage.addEventListener('click', () => {
  setState('Settings', 1, -1);  // Determines if-statement and false to avoid repetitive clicks and concatenation
});

// User clicks heading:
homePage.addEventListener('click', () => {
  setState('Head', 1, -1);
});

// User clicks back button:
window.addEventListener('popstate', (event) => {
  // window.history.back();  Doesn't work as we are dealing with SPA. Work with states.

  if (event.state.page_id == 'Settings')
  {
    setState('Settings', 0, -1);
  }
  else if (event.state.page_id == 'Head')
  {
    setState('Head', 0, -1);
  }
  else if (event.state.page_id == 'Entry')
  {
    setState('Entry', 0, -1);
  }
});

let index = 0;

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        // Take a shortcut and use given code to traverse for each journal-entry:
        newPost.id = ++index;   // Keep this outside of eventListener or it will keep counting

        newPost.addEventListener('click', () => {
          setState('Entry', 1, newPost);
        });

      });
    });
});
