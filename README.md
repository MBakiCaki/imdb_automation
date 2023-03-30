# imdb_automation
To run:

```npx playwright test```

By default:
- Uses chromium browser
- Runs parallel
- In headless mode

configurations can be edited in playwright.config.js

To run headed:

```npx playwright test --headed```


## Scenario
For the movies "The Jazz Singer" and "The Circus"
- Find the movie from oscar awards
- Open movie page
- Save basic movie info
- Navigate to main page
- Search for the same movie
- Open movie page
- Check movie info is same
- Check all movie photo links are woking
