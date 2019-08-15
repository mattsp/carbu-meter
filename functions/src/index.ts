import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// // Start writing Firebase Functions //
// https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

admin.initializeApp(functions.config().firebase)

const tripsDocRef = functions.firestore.document('trips/{tripId}')
const counterDocRef = functions.firestore.document('counters/trips')
export const incrementTripsCounter = tripsDocRef.onCreate((event: any) => {
  const counterRef = event.data.ref.firestore.doc('counters/trips')

  counterRef.get().then((documentSnapshot: any) => {
    const currentCount = documentSnapshot.exists
      ? documentSnapshot.data().count
      : 0

    counterRef
      .set({
        count: Number(currentCount) + 1,
      })
      .then(() => {
        console.log('Trips counter increased!')
      })
  })
})

export const decrementTripsCounter = tripsDocRef.onDelete((event: any) => {
  const counterRef = event.data.ref.firestore.doc('counters/trips')

  counterRef.get().then((documentSnapshot: any) => {
    const currentCount = documentSnapshot.exists
      ? documentSnapshot.data().count
      : 0

    counterRef
      .set({
        count: Number(currentCount) - 1,
      })
      .then(() => {
        console.log('Trips counter decreased!')
      })
  })
})

export const recountIncomesCount = counterDocRef.onDelete((event: any) => {
  const incomesRef = event.data.ref.firestore.collection('trips')
  const counterRef = event.data.ref.firestore.doc('counters/trips')
  return incomesRef.get().then((querySnapshot: any) => {
    counterRef.set({
      count: querySnapshot.docs.length,
    })
  })
})
