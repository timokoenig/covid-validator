<img src="./assets/covidvalidator.png" alt="Logo Covid Validator" />

Check EU Digitial Covid Certificates with ease and validate them against local or country rules.

### What is the purpose of Covid Validator?

Covid Validator allows you to scan and validate EU Digital Covid Certificates based on country or local rules. It gives the person that checks the certificate only as little personal information as possible to protect the users' privacy. This web app is an alternative to other existing products because it does not rely on certain app stores or country restrictions.

### What does BETA mean?

The web app is still in active development and might contain minor bugs. The production use of this app is not recommended yet, so please use it with caution. Updates will come regularly.

### What rules are being used?

At the moment the app uses the official EU entry rules to validate the certificate. These rules are being provided by the member countries of the Digital Covid Certificate. It is a known problem that those rules might be out of date and does not reflect state or local regulations. This project is working on a custom rule builder that allows more precise rules for local regulations. You can follow the development [here](https://github.com/timokoenig/covid-validator/issues/4).

### Additional Information

- [EU Digital Covid Certificate Documentation](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en)
- [PDF EU DCC Validation Rules](https://ec.europa.eu/health/system/files/2021-06/eu-dcc_validation-rules_en_0.pdf)
- [DGC Business Rules Implementation Details](https://github.com/ehn-dcc-development/dgc-business-rules)

## Getting Started

```sh
NEXT_PUBLIC_CONTACT_NAME=xxx
NEXT_PUBLIC_CONTACT_ADDRESS=xxx
NEXT_PUBLIC_CONTACT_ADDRESS_CITY=xxx
NEXT_PUBLIC_CONTACT_ADDRESS_COUNTRY=xxx
NEXT_PUBLIC_CONTACT_EMAIL=xxx
NEXT_PUBLIC_CONTACT_WEBSITE=covidvalidator.app
NEXT_PUBLIC_VERSION=0.0.1
```

```sh
npm install
npm run dev
```

## Developer Notes

The qr code reader needs to run over localhost or ssl to work. For the local development follow the script on https://github.com/vercel/next.js/discussions/10935#discussioncomment-1540436 and run `ipconfig getifaddr en0` to get your address. Now you can access your dev build via https on your network.
