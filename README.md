#JSON schema data processor with FakerJS

## How is that working ?
You just need to require this module and pass a JSON schema to get an output on JSON format. Needs a 'fixture' attribute in your JSON schema (not part of JSON schema spec).

```javascript
var fakeIt = require('json-schema-processor');

var mockedJson = fakeIt(myJsonSchema);
```

Where `myJsonSchema` is a json schema like the following :

```javascript
{
  "id": "mywebsite.co/people",
  "type": "object",
  "properties": {
    "list": {
      "type": "array",
      "required": true,
      "items": [
        {
          "type": "object",
          "required": true,
          "properties": {
            "member_id": {
              "type": "number",
              "required": true
            },
            "given_name": {
              "type": "string",
              "required": true
            },
            "family_name": {
              "type": "string",
              "required": true
            }
          }
        }
      ]
    }
  }
}
```

You can then add fixture attributes that way :

```javascript
items.member_id.fixture = {
  "type": "random.number",
  "params": "10000"
};

items.given_name.fixture = {
  "type": "Name.firstName"
};

items.family_name.fixture = {
  "type": "Name.lastName"
};

// Export the json schema
module.exports = peopleFixtures;
```