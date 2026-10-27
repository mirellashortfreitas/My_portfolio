# Mirella Short Freitas | Portfolio

Personal portfolio website of Mirella Short Freitas, QA Engineer and Photographer. It presents her experience, skills, certificates and extra courses, a photography gallery, and a contact form that delivers messages by email.

The certificates and extra courses are served by a small Node.js/Express API and rendered dynamically on the home page.

## Features

- Single-page portfolio with sections: Home, About, Experience, Skills, Certificates, Extras, Photography and Contact
- Certificates and extra courses loaded from JSON files through a REST API, sorted from newest to oldest, with category filters
- Photography gallery page with lightbox, watermark overlay and back-to-top button
- Dark/light theme toggle (remembered in the browser)
- Contact page with a form (name, email, message) that sends the message by email using Nodemailer
- Spam and abuse protection: honeypot field, server-side validation, rate limiting and security headers (Helmet)
- Accessibility: skip link, visible focus states, labelled controls
- Responsive layout with Google Fonts (Inter and Playfair Display)

## Tech stack

- **Front end:** HTML, CSS, vanilla JavaScript
- **Back end:** Node.js and Express 5
- **Email:** Nodemailer (SMTP)
- **Security:** Helmet, express-rate-limit
- **Configuration:** dotenv (environment variables)
- **Images:** sharp (used by `watermark.js`)
- **Data:** static JSON files

## Project structure

```
.
├── server.js                 # Express server, API routes and contact form
├── watermark.js              # Image processing script (sharp)
├── package.json
├── .env                      # Local secrets (NOT committed)
├── data/
│   ├── certificates.json     # Certificates (LinkedIn Learning, Cisco, Senac...)
│   └── extracourse.json      # Extra courses (GCSEs, diplomas...)
└── public/
    ├── index.html            # Home page
    ├── contact.html          # Contact form page
    ├── photography.html      # Photography gallery
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── theme.js          # Dark/light theme toggle
    │   ├── script.js         # Fetches and renders certificates and extras
    │   ├── contact.js        # Sends the contact form to the API
    │   ├── gallery.js        # Gallery lightbox
    │   └── back-to-top.js    # Back-to-top button
    └── img/                  # Photos and images
```

## Getting started

### Requirements

- [Node.js](https://nodejs.org/) 20.9 or later
- npm
- An email account with SMTP access (for the contact form)

### Installation

```
git clone https://github.com/mirellashortfreitas/My_portfolio.git
cd My_portfolio
npm install
```

### Environment variables

Create a `.env` file in the project root. **Never commit this file** (it is listed in `.gitignore`).

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO=where-to-receive-messages@gmail.com
```

| Variable     | Description                                                      |
|--------------|------------------------------------------------------------------|
| `SMTP_HOST`  | SMTP server host                                                 |
| `SMTP_PORT`  | SMTP port (465 uses SSL)                                         |
| `SMTP_USER`  | Account used to send the email                                   |
| `SMTP_PASS`  | Password for that account                                        |
| `CONTACT_TO` | Address that receives the contact form messages                  |
| `PORT`       | Optional. Port the site runs on (default 3000)                   |

If you use Gmail, `SMTP_PASS` must be an **app password**, not your normal password. Turn on 2-step verification, then create one at <https://myaccount.google.com/apppasswords> and paste the 16 characters without spaces.

### Running

```
npm run dev      # loads the .env file
```

or

```
npm start        # for hosts that provide environment variables themselves
```

The site will be available at **http://localhost:3000**.

## API

| Method | Endpoint            | Description                                  |
|--------|---------------------|----------------------------------------------|
| GET    | `/api/certificates` | Returns all certificates, newest first       |
| GET    | `/api/extras`       | Returns all extra courses, newest first      |
| POST   | `/api/contact`      | Validates the form and sends an email        |

Items are sorted by the `date` field (descending). Items with an empty date appear last.

### Certificate / course format

```
{
  "id": 1,
  "title": "Understanding Manual Testing",
  "issuer": "LinkedIn Learning",
  "date": "2026-10",
  "category": "Testing & QA",
  "link": "https://drive.google.com/file/d/.../view"
}
```

| Field      | Description                                          |
|------------|------------------------------------------------------|
| `id`       | Unique number                                        |
| `title`    | Name of the course or certificate                    |
| `issuer`   | Institution or platform that issued it               |
| `date`     | `YYYY-MM` or `YYYY` (used for sorting)               |
| `category` | Used to group items (e.g. Testing & QA, Cloud, Data) |
| `link`     | Link to the certificate file                         |

## Contact form

`public/contact.html` sends the form to `POST /api/contact` through `contact.js`. The server:

- Rejects invalid data (name up to 80 characters, valid email, message of 10 to 2000 characters)
- Silently ignores submissions that fill the hidden `website` honeypot field
- Limits each IP to 5 messages per hour
- Sends the message as plain text, with the visitor's email as the reply-to address

## Updating content

- **Add a certificate:** add a new object to `data/certificates.json` with a new `id`.
- **Add an extra course:** add a new object to `data/extracourse.json`.
- **Edit about, experience, skills or contact info:** edit `public/index.html`.
- **Add photos:** add the images to `public/img/` and a new `<figure>` to `public/photography.html`.

Restart the server after changing the JSON files, since they are loaded once at startup.

## Deployment

Do not upload the `.env` file to the host. Instead, add the five variables above in the host's "Environment Variables" settings (Render, Railway, a VPS, etc.). The server uses `trust proxy`, which is correct when the site runs behind a proxy; remove that line in `server.js` when running locally without one.

## Contact

- Email: mirellashortfreitas@gmail.com
- LinkedIn: <https://www.linkedin.com/in/mirella-short-freitas-447b4a138>
- GitHub: <https://github.com/mirellashortfreitas>

## License

All rights reserved © Mirella Short Freitas. Replace this section with a license of your choice if you want others to reuse the code.