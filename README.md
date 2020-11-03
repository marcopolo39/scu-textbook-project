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
python manage.py migrate
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
