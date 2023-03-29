import { test, expect } from '@playwright/test';

test('case', async ({ page }) => {

    // navigate to the website
    await page.goto('https://www.imdb.com/');

    // open Oscars page
    await page.locator('#imdbHeader-navDrawerOpen').click();
    await page.locator('.ipc-list-item__text').filter({ hasText: 'Oscars' }).click();

    // open the movie page
    let eventHistory = page.locator('.event-history-widget__years'); //find event history table
    await eventHistory.getByRole('link', { name: '1929' }).click();

    let honoraryAwards = page.locator('.event-widgets__award')
        .filter({ has: page.locator('.event-widgets__award-name', { hasText: 'Honorary Award' }) });

    await honoraryAwards.locator('.event-widgets__nominee-name', {hasText: 'The Jazz Singer'}).click()
    
    // assign movie info to variables
    // -hasText does not uses strict matching
    let director = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Director',}).first().innerText();//filter({ has: page.locator('span[]') })
    // console.log(director)
    let writer = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Writer'}).first().innerText();
    // console.log(writer);
    let star = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Star'}).first().innerText();
    // console.log(star);
    
    // await page.pause()

})
