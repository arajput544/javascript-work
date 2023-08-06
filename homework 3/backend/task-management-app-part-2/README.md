How to Use

1. Edit the config.json file to match your Mongo Atlas Cloud details.

---

2. Open and review the models folder. In order for the Routes, Controller and Services to function properly - the data stored in your Mongo Database MUST match the the Mongoose Models defined in the models folder including the relationship between Projects, Tasks and Users. This means you have two options as outlined below.

-   Option 1 (easy):
    Update the data in your Mongo Cloud Database to match the Mongoose Models. Ensure that your new data matches exactly - including the property/key names and the associated type (string, number, boolean, etc).

-   Option 2 (challenging):
    Update the Mongoose Models to match the data stored in your Mongo Cloud Database. This is noted as "challenging" because if the relationships differ then this means you MUST also make additional code changes in the Service layer to handle creating relationships and the validation of those relationships.

---

3. Once you have chosen and completed any associated requirements for Option 1 or Option 2.

Go into the helpers folder. Use the mongo-query-script.js as needed to insert some data with VALID relationships into your Mongo DB. This step will most likely be needed if you picked Option 1.

---

4. Once you completed steps 1-3.

Optionally, go into the helpers folder and import the task-app-test.json into POSTMAN to view the URLs and POST/PUT body for each endpoint. This POSTMAN file is also related to Option 1.

When making requests - REPLACE ALL identifiers (ids) with actual ids from your Mongo Cloud Atlas Database. This includes ids in the URLs, ids in the POST/PUT body, etc. ALL the ids should be ids from your Mongo Cloud Atlas Databse.
