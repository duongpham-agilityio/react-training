# Products management

### Overview

- This is the website for shopping and manage product.
- Design:
  - Products management [here](<https://www.figma.com/file/n5ACucnmYWfUvXja46YZXS/e-shopping-website-redesign-(Community)?type=design&node-id=0-1&mode=design&t=isBt5YBYyi7Cm1DC-0>)
- Plan: [here](https://docs.google.com/document/d/1iRr0LhzKkR29vpm8js6BG4rVCc8ITGJxzN5LmvwvDhY/edit)
- App workflow [here](https://miro.com/app/board/uXjVNfGsX7Y=/?share_link_id=761369513237)
- Deploy: [here](https://pracitce-three.vercel.app/)

### Updated

- README.md
- Constants file
  - HTTP status
  - Time
  - Remove interface and Utility type
- Stores
  - Create stores folder
- Hooks
  - Update logic handler
- Custom theme for ChakraUI
- Implement unit test

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
- List product
- Add product
- Edit product
- Remove product
- If a product has been deleted, that product will also be deleted from the favorites and carts list.
- Wishlist
  - Display favorite product information.
- Carts
  - Same case editing the wishlist
- Checkout
- Sign In
  - If the user is not logged in, he or she can access the page
  - If the user is already logged in, navigate the user back to the home page

### Information

- Timeline
  - Estimate day: 6 days
  - Actual time: 8.5 days
- Techniques:
  - ChakraUI:[v2.8.1](https://chakra-ui.com/getting-started)
  - TypeScript [v5.2.2](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
  - React [v18.2.0](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html)
  - JSON server [v0.17.4](https://www.npmjs.com/package/json-server)
  - localStorage
  - Vite [v4.4.5](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
  - Eslint [v8.0.1](https://eslint.org/docs/latest/use/getting-started#quick-start)
  - Prettier [v2.8.7](https://prettier.io/docs/en/install.html)
  - Jest [v29.5.0](https://jestjs.io/docs/getting-started)
  - Ts-jest [v29.0.5](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation)
  - React-testing [v14.0.0](https://testing-library.com/docs/react-testing-library/intro/)
  - React Query: [v4.35.7](https://tanstack.com/query/v4/docs/react/overview)
  - Zustand: [v4.4.1](https://docs.pmnd.rs/zustand/getting-started/introduction)
  - MSW: [v1.3.2](https://mswjs.io/docs/)
- Editor: Visual Studio Code.

### Development Environment

- Node [v16.20.0](https://nodejs.org/en/)
- Pnpm [v8.6.5](https://pnpm.io/installation)

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
- Step 3: Move to branch feature/practice-three
  ```
  git checkout feature/practice-three
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
