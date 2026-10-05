# Mirella Short Freitas | Portfolio

Personal portfolio website of Mirella Short Freitas, QA Engineer and Photographer. It presents her experience, skills, certificates and extra courses, with a dark/light theme toggle and a contact page.

The certificates and extra courses are served by a small Node.js/Express API and rendered dynamically on the home page.

## Features

- Single-page portfolio with sections: Home, About, Experience, Skills, Certificates, Extras and Contact
- Certificates and extra courses loaded from JSON files through a REST API, sorted from newest to oldest
- Dark/light theme toggle
- Separate contact page with a form (name, email, message) and a honeypot field for basic spam protection
- Responsive layout with Google Fonts (Inter and Playfair Display)

## Tech stack

- **Front end:** HTML, CSS, vanilla JavaScript
- **Back end:** Node.js and Express
- **Data:** static JSON files

## Project structure

```
.
├── server.js                 # Express server and API routes
├── package.json
├── data/
│   ├── certificates.json     # Certificates (LinkedIn Learning, Cisco, Senac...)
│   └── extracourse.json      # Extra courses (GCSEs, diplomas...)
└── public/
    ├── index.html            # Home page
    ├── contact.html          # Contact form page
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── theme.js          # Dark/light theme toggle
    │   └── script.js         # Fetches and renders certificates and extras
    └── img/
        └── mirella_photo.png
```

## Getting started

### Requirements

- [Node.js](https://nodejs.org/) 18 or later
- npm

### Installation

```bash
git clone https://github.com/mirellashortfreitas/<repository-name>.git
cd <repository-name>
npm install
```

If there is no `package.json` yet, create one and install Express:

```bash
npm init -y
npm install express
```

### Running

```bash
node server.js
```

The site will be available at **http://localhost:3000**.

To use a different port:

```bash
PORT=8080 node server.js
```

## API

| Method | Endpoint            | Description                                    |
|--------|---------------------|------------------------------------------------|
| GET    | `/api/certificates` | Returns all certificates, newest first         |
| GET    | `/api/extras`       | Returns all extra courses, newest first        |

Items are sorted by the `date` field (descending). Items with an empty date appear last.

### Certificate / course format

```json
{
  "id": 1,
  "title": "Understanding Manual Testing",
  "issuer": "LinkedIn Learning",
  "date": "2026-10",
  "category": "Testing & QA",
  "link": "https://drive.google.com/file/d/.../view"
}
```

| Field      | Description                                         |
|------------|-----------------------------------------------------|
| `id`       | Unique number                                       |
| `title`    | Name of the course or certificate                   |
| `issuer`   | Institution or platform that issued it              |
| `date`     | `YYYY-MM` or `YYYY` (used for sorting)              |
| `category` | Used to group items (e.g. Testing & QA, Cloud, Data)|
| `link`     | Link to the certificate file                        |

## Updating content

- **Add a certificate:** add a new object to `data/certificates.json` with a new `id`.
- **Add an extra course:** add a new object to `data/extracourse.json`.
- **Edit about, experience, skills or contact info:** edit `public/index.html`.

Restart the server after changing the JSON files, since they are loaded once at startup.

## Contact form

`public/contact.html` includes a form with client-side validation (required fields, email format, minimum 10 characters for the message) and a hidden `website` honeypot field. Handling the submission requires a backend endpoint (for example `POST /api/contact`) and a way to deliver the message, such as an email service.

## Contact

- Email: mirellashortfreitas@gmail.com
- LinkedIn: https://www.linkedin.com/in/mirella-short-freitas-447b4a138
- GitHub: https://github.com/mirellashortfreitas

## License

All rights reserved © Mirella Short Freitas. Replace this section with a license of your choice if you want others to reuse the code.
