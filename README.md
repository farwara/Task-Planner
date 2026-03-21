Task Planner

Task Planner is a React application that allows users to manage their tasks in an organized way.
Users can register, log in, create tasks, view them on the dashboard, search tasks, update tasks and delete them.



The application communicates with the Novi Backend API and uses JWT authentication for protected routes.



--------------------------------------------------



Features

- User registration

- User login with JWT authentication

- Protected dashboard route

- Create new tasks

- View all tasks

- Search tasks

- View task details

- Update tasks

- Delete tasks

- Loading and error handling for asynchronous requests



--------------------------------------------------



Technologies Used

- React

- React Router

- JavaScript (ES6)

- CSS Modules

- Vite

- Novi Backend API



--------------------------------------------------



Installation Guide



1. Clone the repository

git clone https://github.com/YOUR_GITHUB_USERNAME/task-planner.git



2. Navigate into the project folder

cd task-planner



3. Install dependencies

npm install



4. Configure the API

Upload the file task-planner-config.json to the Novi backend configuration page.



After uploading the configuration you will receive a Project ID.



Create a .env file in the root of the project and add:



VITE_API_URL=https://novi-backend-api-xxxxx.ondigitalocean.app

VITE_PROJECT_ID=YOUR_PROJECT_ID



5. Start the development server

npm run dev



The application will run at:

http://localhost:5173



--------------------------------------------------



Available Scripts



Start development server

npm run dev



Build production version

npm run build



Preview production build

npm run preview



--------------------------------------------------



Application Structure



src

├── api

│   └── api.js

│

├── components

│   ├── common

│   │   ├── Button.jsx

│   │   ├── ErrorMessage.jsx

│   │   └── Loader.jsx

│   │

│   ├── Layout

│   │   └── Layout.jsx

│   │

│   └── TaskCard.jsx

│

├── context

│   └── AuthContext.jsx

│

├── pages

│   ├── AddTask.jsx

│   ├── Dashboard.jsx

│   ├── Login.jsx

│   ├── Register.jsx

│   └── TaskDetail.jsx

│

├── routes

│   └── PrivateRoute.jsx

│

├── styles

│   └── global.css

│

├── App.jsx

└── main.jsx



--------------------------------------------------



Authentication



Authentication is implemented using JWT tokens.



After logging in successfully:

- The backend returns a token

- The token is stored in localStorage

- The token is included in API requests through the Authorization header



Example header:

Authorization: Bearer TOKEN



Protected routes are implemented using the PrivateRoute component.



--------------------------------------------------



API Communication



All API requests are handled through the apiFetch function located in:

src/api/api.js



This wrapper ensures that:

- the correct API base URL is used

- the project ID header is included

- the authorization token is included

- errors are handled properly



Example request:



await apiFetch("/api/tasks", {

method: "POST",

body: JSON.stringify({

    title,

    description,

    completed: false

})

});



--------------------------------------------------



Asynchronous Handling



The application uses asynchronous functions to communicate with the backend.



For example:

- Loading states are shown when fetching tasks

- Errors are handled with try/catch

- Requests can be aborted using AbortController to prevent memory leaks



Example:



const controller = new AbortController();



useEffect(() => {

loadTasks(controller.signal);



return () => controller.abort();

}, []);



--------------------------------------------------



Reusable Components



The application uses reusable components to keep the code modular.



Examples include:

- TaskCard

- Button

- Loader

- ErrorMessage

- Layout



These components are reused across multiple pages to maintain consistency.



--------------------------------------------------



Screenshots



(Add screenshots here for the teacher)



Example:

- Login page

- Dashboard page

- Add task page

- Task details page



--------------------------------------------------



Author



Farwa Rafique



 