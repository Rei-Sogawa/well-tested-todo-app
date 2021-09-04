import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onCall(() => {
  return 'hello world';
});
