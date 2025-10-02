import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  User: a
    .model({
      email: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      phoneNumber: a.string(),
      profilePhotoUrl: a.string(),
      listings: a.hasMany('Listing', 'userId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),

  Listing: a
    .model({
      slug: a.string().required(),
      // Basic Info
      address: a.string().required(),
      city: a.string().required(),
      state: a.string().required(),
      zipCode: a.string().required(),
      // Pricing & Size
      price: a.integer().required(),
      beds: a.integer().required(),
      baths: a.float().required(),
      sqft: a.integer().required(),
      // Financial Details
      assumableRate: a.float().required(),
      loanBalance: a.integer().required(),
      equity: a.integer().required(),
      // Additional Details
      description: a.string(),
      schoolDistrict: a.string(),
      hoaFees: a.integer(),
      amenities: a.string().array(),
      // Images
      primaryImageUrl: a.string().required(),
      imageUrls: a.string().array(),
      // Metadata
      listingDate: a.date().required(),
      status: a.enum(['active', 'pending', 'sold', 'archived']),
      // Owner relationship
      userId: a.string().required(),
      user: a.belongsTo('User', 'userId'),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.owner().to(['create', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
