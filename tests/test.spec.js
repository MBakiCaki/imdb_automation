import { test, expect } from '@playwright/test';

test('The Jazz Singer Movie', async ({ page, request }) => {

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
    await page.waitForLoadState();
    // const as = await page.$$('#media_index_thumbnail_grid a');
    // const pictureLinks = [];

    // for (const a of as) {
    //     let href = await a.getAttribute('href');
    //     pictureLinks.push(href)
    // }

    // // console.log(pictureLinks);
    // // console.log(pictureLinks.length);

    // const baseUrl = `https://www.imdb.com`;
    // // Check all photo links works
    // // --default timeout might be exceeded(leads to test failure) because of the loop
    // test.setTimeout(120000);
    // for (const link of pictureLinks) {

    //     const response = await request.get(baseUrl + link);
    //     await expect(response).toBeOK(); // response validation
    //     // console.log(response.status())
    // }
    var as;
    var pictureLinks = [];

    let hasNextPage = true;
    while (hasNextPage) {
        // Gather a tags containing links
        const as = await page.$$('#media_index_thumbnail_grid a');

        // Add links to the pictureLinks list
        for (const a of as) {
            const href = await a.getAttribute('href');
            pictureLinks.push(href);
        }

        // Check if there is a next page of images
        hasNextPage = await page.locator('.prevnext', { hasText: 'Next' }).first().isVisible();
        if (hasNextPage) {
            await page.locator('.prevnext', { hasText: 'Next' }).first().click();
            await page.waitForLoadState();
        }
    }



    console.log(pictureLinks);
    console.log(pictureLinks.length);

    const baseUrl = `https://www.imdb.com`;
    const requestOptions = {
        timeout: 4000 // Set the timeout to 10 seconds
    };
    // Check all photo links works
    // --default timeout might be exceeded(leads to test failure) because of the loop
    test.setTimeout(120000);
    for (const link of pictureLinks) {

        const response = await request.get(baseUrl + link, { timeout: 4000 });
        await expect(response).toBeOK(); // response validation
        // console.log(response.status())
    }
    console.log("---------")
})


test('The Circus Movie', async ({ page, request }) => {

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

    await honoraryAwards.locator('.event-widgets__nominee-name', { hasText: 'The Circus' }).click()

    // assign movie info to variables
    // -hasText does not uses strict matching
    let director = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Director', }).first().innerText();

    let writer = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Writer' }).first().innerText();

    let star = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Star' }).first().innerText();
    // await page.pause()

    // -- FROM SEARCH
    // navigate to main page
    await page.getByRole('link', { name: 'Home' }).click();

    // search and navigate to "The Jazz Singer" movie page
    await page.getByPlaceholder('Search IMDb').click();
    await page.getByPlaceholder('Search IMDb').type('The Circus');
    await page.getByRole('link', { name: 'The Circus The Circus 1928 Charles Chaplin, Merna Kennedy' }).click();

    // find and compare movie info
    let director2 = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Director' }).first().innerText();
    expect(director2).toEqual(director);

    let writer2 = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Writer' }).first().innerText();
    expect(writer2).toEqual(writer);

    let star2 = await page.getByRole('listitem').filter(page.getByTestId('title-pc-principal-credit')).filter({ hasText: 'Star' }).first().innerText();
    expect(star2).toEqual(star);

    // await page.getByTestId('Photos').filter( { has: page.getByRole('link', { hasText: 'Photos' })}).click();

    await page.getByRole('link', { name: 'Photos 91' }).click();
    await page.waitForLoadState();
    // await page.pause();

    var as;
    var pictureLinks = [];

    // await page.pause();
    // var next = false;
    // do{
    //     // gather a tags containing links
    //     as = await page.$$('#media_index_thumbnail_grid a');
    //     // add links to the pictureLinks list
    //     for (const a of as) {
    //         let href = await a.getAttribute('href');
    //         pictureLinks.push(href)
    //     }
    //     next = false
    //     // check if there is a second page of images
    //     if(await page.locator('.prevnext', {hasText: 'Next'}).first().isVisible()){ 

    //         next = true
    //         await page.locator('.prevnext', {hasText: 'Next'}).first().click()
    //     }
    // } 
    // while(next)
    // const pictureLinks = [];
    // for (const a of as) {
    //   let href = await a.getAttribute('href');
    //   pictureLinks.push(href)
    // }
    //if .prevnext visible

    let hasNextPage = true;
    while (hasNextPage) {
        // Gather a tags containing links
        const as = await page.$$('#media_index_thumbnail_grid a');

        // Add links to the pictureLinks list
        for (const a of as) {
            const href = await a.getAttribute('href');
            pictureLinks.push(href);
        }

        // Check if there is a next page of images
        hasNextPage = await page.locator('.prevnext', { hasText: 'Next' }).first().isVisible();
        if (hasNextPage) {
            await page.locator('.prevnext', { hasText: 'Next' }).first().click();
            await page.waitForLoadState();
        }
    }



    console.log(pictureLinks);
    console.log(pictureLinks.length);

    const baseUrl = `https://www.imdb.com`;
    const requestOptions = {
        timeout: 4000 // Set the timeout to 10 seconds
    };
    // Check all photo links works
    // --default timeout might be exceeded(leads to test failure) because of the loop
    test.setTimeout(120000);
    for (const link of pictureLinks) {

        const response = await request.get(baseUrl + link, { timeout: 4000 });
        await expect(response).toBeOK(); // response validation
        // console.log(response.status())
    }
})
