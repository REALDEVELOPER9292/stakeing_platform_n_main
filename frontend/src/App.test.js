import React from 'react';
import App from './App';
import { render, waitForElement } from "react-testing-library";
import newsFeed from "./NewsFeed"


beforeEach(() => {
  fetch.resetMocks();
});


