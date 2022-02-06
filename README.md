<img src="./assets/covidvalidator.png" alt="Logo Covid Validator" />

Check EU Digitial Covid Certificates with ease and validate them against local or country rules.

### What is the purpose of Covid Validator?

Covid Validator allows you to scan and validate EU Digital Covid Certificates based on country or local rules. It gives the person that checks the certificate only as little personal information as possible to protect the users' privacy. This web app is an alternative to other existing products because it does not rely on certain app stores or country restrictions.

### What does BETA mean?

The web app is still in active development and might contain minor bugs. The production use of this app is not recommended yet, so please use it with caution. Updates will come regularly.

### What rules are being used?

At the moment the app uses the official EU entry rules to validate the certificate. These rules are being provided by the member countries of the Digital Covid Certificate. It is a known problem that those rules might be out of date and does not reflect state or local regulations. This project is working on a custom rule builder that allows more precise rules for local regulations. You can follow the development [here](https://github.com/timokoenig/covid-validator/issues/4).

## Getting Started

```sh
CONTACT_NAME=xxx
CONTACT_ADDRESS=xxx
CONTACT_ADDRESS_COUNTRY=xxx
CONTACT_EMAIL=xxx
CONTACT_WEBSITE=covidvalidator.app
VERSION=0.0.1
```

```sh
npm install
npm run dev
```

## Developer Notes

The qr code reader needs to run over localhost or ssl to work. For the local development follow the script on https://github.com/vercel/next.js/discussions/10935#discussioncomment-1540436 and run `ipconfig getifaddr en0` to get your address. Now you can access your dev build via https on your network.
