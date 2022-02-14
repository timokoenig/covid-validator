# Immunization Rules

## both numbers are \* and any symbol

```json
{
  ">": [
    {
      "var": "payload.v.0.dn"
    },
    {
      "var": "payload.v.0.sd"
    }
  ]
}
```

## both numbers are fix and any symbol

```json
{
  "and": [
    {
      "==": [
        {
          "var": "payload.v.0.dn"
        },
        1
      ]
    },
    {
      "==": [
        {
          "var": "payload.v.0.sd"
        },
        1
      ]
    },
    {
      ">": [
        {
          "var": "payload.v.0.dn"
        },
        {
          "var": "payload.v.0.sd"
        }
      ]
    }
  ]
}
```
