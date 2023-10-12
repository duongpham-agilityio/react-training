# Products management

### Overview

- This is the website for shopping and manage product.
- Design:
  - Products management [here](<https://www.figma.com/file/n5ACucnmYWfUvXja46YZXS/e-shopping-website-redesign-(Community)?type=design&node-id=0-1&mode=design&t=isBt5YBYyi7Cm1DC-0>)
- Plan: [here](https://docs.google.com/document/d/1iRr0LhzKkR29vpm8js6BG4rVCc8ITGJxzN5LmvwvDhY/edit)
- App workflow [here](https://miro.com/app/board/uXjVNfGsX7Y=/?share_link_id=761369513237)
- Deploy: (Updating...)

### Targets

- Apply HTML/CSS/TypeScript/ReactJs trained knowledge to build a website
- Unit test
- Storybook
- Zustand
- React Query
- MSW

### Requirements

- Sidebar
  - Show all options with the user-logged
  - Show wishlist, card, wallets and mode
- List product
- Mode (dark, light)
- Add product
  - If the user doesn't log in then redirect the user to log in page
  - If user-logged then continue to the next step
- Edit product
  - Users can only edit their own products in their profile
- Remove product
  - Same case Editing product
- Wishlist
  - Calculated for only logged-in users
- Carts
- Same case editing the wishlist
- Checkout
  - If the user is not logged in, the user will be redirected to the login page. After successful login, the user will be redirected to the page the user has selected.
  - If user-logged then continue to the next step
- Sign In
  - If the user is not logged in, he or she can access the page
  - If the user is already logged in, navigate the user back to the home page

### Information

- Timeline
  - Estimate day: 6 days
  - Actual time: 8.5 days
- Techniques:
  - HTML5/CSS [last version](https://html.spec.whatwg.org/multipage/)
  - TypeScript [v4.9.5](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
  - React [v18.2.0](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html)
  - JSON server [v0.17.3](https://www.npmjs.com/package/json-server)
  - localStorage
  - Vite [v4.2.0](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
  - Eslint [v8.0.1](https://eslint.org/docs/latest/use/getting-started#quick-start)
  - Prettier [v2.8.7](https://prettier.io/docs/en/install.html)
  - Jest [v29.5.0](https://jestjs.io/docs/getting-started)
  - Ts-jest [v29.0.5](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation)
  - React-testing [v14.0.0](https://testing-library.com/docs/react-testing-library/intro/)
  - React Query: Updating...
  - Zustand: Updating...
  - MSW: Updating...
- Editor: Visual Studio Code.

### Development Environment

- Node [v16.20.0](https://nodejs.org/en/)
- Yarn [v1.22.19](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

### Main App Features

- Login
- Home:
  - View all products
  - Search and filter products
- Detail:
  - View detail books
  - Add to cart
- Wishlist:
  - View all products
  - Remove products
- Cart:
  - View all products
  - Remove from cart
  - Update quantity
- Profile:
  - View all products
  - Add new product
  - Update product
  - Remove product

### Getting Started

- Step 1: Clone repository
  - With HTTPS :
    ```
    git clone https://gitlab.asoft-python.com/duong.pham/reactjs-training.git
    ```
  - With SSH:
    ```
    git clone git@gitlab.asoft-python.com:duong.pham/reactjs-training.git
    ```
- Step 2: Move to folder
  ```
  cd reactjs-training
  ```
- Step 3: Move to branch develop
  ```
  git checkout develop
  ```
- Step 4: Move to folder
  ```
  cd  practices/practice-three
  ```
- Step 5: Now you need to install packages
  ```
  pnpm install
  ```
- Step 6: After installing the packages
  ```
  pnpm start
  ```
- Step 7: Open [localhost](http://localhost:5173) to see the website
