import { test, expect } from '@playwright/test';

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  })
  test("should have correct meta data ", async ({ page }) => {

    await expect(page).toHaveTitle(" Create Next App");
    await expect(page.getByRole("heading", { name: "Featured Products" })).toBeVisible();

  })
  test("should render products card ", async ({ page }) => {
    const productCard = page.getByTestId("productCard");
    await expect(productCard.first()).toBeVisible()
    await productCard.first().click();
    await expect(page).toHaveURL(/\/products\/.+/);

  })
  test("Navbar category are rendered", async ({ page }) => {
    const categoryLink = page.getByTestId("categoryLink");
    await expect(categoryLink.first()).toBeVisible();
    await categoryLink.first().click();
    
  })

})

test.describe("Product Details Page",()=>{
    test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  })
    test("product card should render detail page ", async({page})=>{
        await page.getByTestId("productCard").first().click();
        await expect(page).toHaveURL(/\/products\/.+/);
        await expect(page.getByRole("button",{name : "SECURE CHECKOUT"})).toBeVisible();
    })
    test("add to cart button should work", async({page})=>{
      await page.getByTestId("productCard").first().click();
      const addToCartButton = page.getByRole("button",{name : "SECURE CHECKOUT"});
      await addToCartButton.click();
      
    })
    
})

test.describe("testing cart sheet", ()=>{
    test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  })
    test("testing cart icon ", async({page})=>{
        await page.getByTestId("cart").click();
        const cartButton = page.getByRole("button",{name : "CHECKOUT"});
        if( await cartButton.isVisible()){
           await cartButton.click();
        } else{
          await expect(page.getByText(/Your cart is empty/i)).toBeVisible()
        }
    })  
})