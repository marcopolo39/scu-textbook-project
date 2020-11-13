# FindABook

SETUP
install node.js (lts support version)
create virtual enviornment
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

---

NEW: We don't need requirements.txt, Pipfile takes care of package management in pipenv

- instead of using "pip install XYZ" use "pipenv install XYZ"

NEW: "npm run start" should be working correctly now

---

## Running Locally

Need: python3, node.js, pip, pipenv

```bash
pipenv shell
pipenv install
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
cd frontend
npm install
npm run start
```

---

## Frontend Routes

- /
- /profile
- /cart
- /search
- /messages
- /login
- /textbook/{textbookId}/

---

## Backend Routes

Description of Users API
- This API handles login, logout, and registering fucntionality. The api can also display the user profile as well as edit the user profile.
- The following links for the Users API is: 
- 1. localhost:8000/api/account/user
- 2. localhost:8000/api/account/register
- 3. localhost:8000/api/account/login
- 4. localhost:8000/api/account/logout
- 5. localhost:8000/api/account/update/<int:pk> (pk is id number)
- 6. localhost:8000//api/account/delete/<int: pk>
- The user endpoint takes 'token' and returns the user profile for the user associated with the token
- The register endpoint takes in 'username', 'email', 'first_name', 'last_name', 'school', 'location', 'password' and saves the user account to the database
- The login endpoint takes in 'username', 'password' and returns a token
- The logout endpoint takes in 'token' and logs the user out by invalidating their token
- The update endpoint takes in 'token' allows for the fields in register except password to be modified and then saves the changes to the database
- The delete enpoint takes in 'token' and delelets the user acccount

Description of Message API
- This API handles messaging between the active user and another register user on the website. 
- Enpoints for this API:
- localhost:8000/api/messages
- The message enpoint handles the ability to get all messages sent between the user and the recipient as well as sending a message to that recipient. 
- If the users wants to see the messages sent between themselves and the recipient, a token is required as well as the username of the recipient.
- If a user wants to send a message, they need the token and the username of the recipient as well as the message to be sent.
