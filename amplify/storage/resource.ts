import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'valorhomesImages',
  access: (allow) => ({
    // Property listing photos - anyone can view, only authenticated users can upload/delete
    'properties/{property_id}/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    // User profile pictures - private to the user who owns them
    'profiles/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
    // Public assets (company logos, default images, etc)
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read'])
    ]
  })
});
