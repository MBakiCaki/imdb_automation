import { test, expect } from '@playwright/test';

test('case', async ({ page, request }) => {

    // -- FROM OSCAR AWARDS
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

    await honoraryAwards.locator('.event-widgets__nominee-name', { hasText: 'The Jazz Singer' }).click()

    // assign movie info to variables
    // -hasText does not uses strict matching
    let director = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Director', }).first().innerText();//filter({ has: page.locator('span[]') })

    let writer = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Writer' }).first().innerText();

    let star = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Star' }).first().innerText();


    // -- FROM SEARCH
    // navigate to main page
    await page.getByRole('link', { name: 'Home' }).click();

    // search and navigate to "The Jazz Singer" movie page
    await page.getByPlaceholder('Search IMDb').click();
    await page.getByPlaceholder('Search IMDb').type('The Jazz Singer');
    await page.getByRole('link', { name: 'The Jazz Singer The Jazz Singer 1927 Al Jolson, May McAvoy' }).click();

    // find and compare movie info
    let director2 = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Director' }).first().innerText();
    expect(director2).toEqual(director);

    let writer2 = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Writer' }).first().innerText();
    expect(writer2).toEqual(writer);

    let star2 = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Star' }).first().innerText();
    expect(star2).toEqual(star);

    // await page.getByTestId('Photos').filter( { has: page.getByRole('link', { hasText: 'Photos' })}).click();

    await page.getByRole('link', { name: 'Photos 48' }).click();

    const as = await page.$$('#media_index_thumbnail_grid a');
    const pictureLinks = [];

    for (const a of as) {
      let href = await a.getAttribute('href');
      pictureLinks.push(href)
    }

    // console.log(pictureLinks);
    // console.log(pictureLinks.length);

    const url = `https://www.imdb.com`;
    // Check all photo links works
    // --default timeout might be exceeded(leads to test failure) because of the loop
    test.setTimeout(120000);
    for (const link of pictureLinks) {

        const response = await request.get(url+link);
        await expect(response).toBeOK(); // response validation
        // console.log(response.status())
    }
})

// test.only('csase', async ({ page, request }) => {
//     await page.goto('https://www.imdb.com/title/tt0018037/mediaindex/?ref_=tt_mi_sm');
//     const as = await page.$$('#media_index_thumbnail_grid a');
//     const pictureLinks = [];

//     for (const a of as) {
//       let href = await a.getAttribute('href');
//       pictureLinks.push(href)
//     }

//     console.log(pictureLinks);
//     console.log(pictureLinks.length);

//     const url = `https://www.imdb.com`;
//     // Check all photo links works
//     // --default timeout might be exceeded(leads to test failure) because of the loop
//     test.setTimeout(120000);
//     for (const link of pictureLinks) {

//         const response = await request.get(url+link);
//         await expect(response).toBeOK(); // response validation
//         // console.log(response.status())
//     }
    

// })
