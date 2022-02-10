# DE Entry Rules

Last Updated: 02/10/2022

There is no guarantee that the information on this page is accurate and up-to-date.

The data is based on the information provided by [pei.de](https://www.pei.de/DE/newsroom/dossier/coronavirus/coronavirus-inhalt.html?nn=169730&cms_pos=3).

## Immunization

| Vaccine         | Medical Product  | Dose | Status               | ValidFrom | ValidTo  | Note                                                     |
| --------------- | ---------------- | ---- | -------------------- | --------- | -------- | -------------------------------------------------------- |
| BioNTech        | EU/1/20/1528     | 1/2  | Partial Immunization | -         | -        |                                                          |
| BioNTech        | EU/1/20/1528     | 2/2  | Full Immunization    | 14 days   | 270 days |                                                          |
| BioNTech        | EU/1/20/1528     | 1/1  | Full Immunization    | -         | 270 days | Full Immunization after recovery                         |
| BioNTech        | EU/1/20/1528     | 3/3  | Booster              | -         | -        | Booster after full immunization ((dn == sn) && sn > 2)   |
| BioNTech        | EU/1/20/1528     | 2/1  | Booster              | -         | -        | Booster after full immunization after recovery (dn > sn) |
|                 |                  |      |                      |           |          |                                                          |
| Moderna         | EU/1/20/1507     | 1/2  | Partial Immunization | -         | -        |                                                          |
| Moderna         | EU/1/20/1507     | 2/2  | Full Immunization    | 14 days   | 270 days |                                                          |
| Moderna         | EU/1/20/1507     | 1/1  | Full Immunization    | -         | 270 days | Full Immunization after recovery                         |
| Moderna         | EU/1/20/1507     | 3/3  | Booster              | -         | -        | Booster after full immunization ((dn == sn) && sn > 2)   |
| Moderna         | EU/1/20/1507     | 2/1  | Booster              | -         | -        | Booster after full immunization after recovery (dn > sn) |
|                 |                  |      |                      |           |          |                                                          |
| AstraZeneca     | EU/1/21/1529     | 1/2  | Partial Immunization | -         | -        |                                                          |
| AstraZeneca     | EU/1/21/1529     | 2/2  | Full Immunization    | 14 days   | 270 days |                                                          |
| AstraZeneca     | EU/1/21/1529     | 1/1  | Full Immunization    | -         | 270 days | Full Immunization after recovery                         |
| AstraZeneca     | EU/1/21/1529     | 3/3  | Booster              | -         | -        | Booster after full immunization ((dn == sn) && sn > 2)   |
| AstraZeneca     | EU/1/21/1529     | 2/1  | Booster              | -         | -        | Booster after full immunization after recovery (dn > sn) |
|                 |                  |      |                      |           |          |                                                          |
| Novavax         | EU/1/21/1618/001 | 1/2  | Partial Immunization | -         | -        |                                                          |
| Novavax         | EU/1/21/1618/001 | 2/2  | Full Immunization    | 14 days   | 270 days |                                                          |
| Novavax         | EU/1/21/1618/001 | 1/1  | Full Immunization    | -         | 270 days | Full Immunization after recovery                         |
| Novavax         | EU/1/21/1618/001 | 3/3  | Booster              | -         | -        | Booster after full immunization ((dn == sn) && sn > 2)   |
| Novavax         | EU/1/21/1618/001 | 2/1  | Booster              | -         | -        | Booster after full immunization after recovery (dn > sn) |
|                 |                  |      |                      |           |          |                                                          |
| Johnson&Johnson | EU/1/20/1525     | 1/1  | Partial Immunization | -         | -        | New regulation starting 01/15/2022                       |
| Johnson&Johnson | EU/1/20/1525     | 2/2  | Full Immunization    | 14 days   | 270 days |                                                          |
| Johnson&Johnson | EU/1/20/1525     | 3/3  | Booster              | -         | -        | Booster after full immunization ((dn == sn) && sn > 1)   |
| Johnson&Johnson | EU/1/20/1525     | 2/1  | Booster              | -         | -        | Booster after full immunization (dn > sn)                |

**Edge cases that can not be identified**

1. Johnson&Johnson; if the user got a 1/1 J&J jab after recovery, this can not be identified anymore and will be handled as partial immunization

## Recovery

| Status    | ValidFrom | ValidTo | Note                                                       |
| --------- | --------- | ------- | ---------------------------------------------------------- |
| Recovered | 28 days   | 90 days | Recovered since date of the first positive PCR test result |

## Test

| Type                   | Max      |
| ---------------------- | -------- |
| negative PCR           | 48 hours |
| negative rapid antigen | 48 hours |
