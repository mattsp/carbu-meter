import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
admin.initializeApp(functions.config().firebase);

const tripsRef = functions.firestore.document('trips/{tripId}')
const counterRef = functions.firestore.document('counters/trips')
export const incrementTripsCounter = tripsRef.onCreate(event => {
  const counterRef = event.data.ref.firestore.doc('counters/trips')

  counterRef.get()
  .then(documentSnapshot => {
    const currentCount = documentSnapshot.exists ? documentSnapshot.data().count : 0

    counterRef.set({
      count: Number(currentCount) + 1
    })
    .then(() => {
      console.log('Trips counter increased!')
    })
  })
})

export const decrementTripsCounter = tripsRef.onDelete(event => {
  const counterRef = event.data.ref.firestore.doc('counters/trips')

  counterRef.get()
  .then(documentSnapshot => {
    const currentCount = documentSnapshot.exists ? documentSnapshot.data().count : 0

    counterRef.set({
      count: Number(currentCount) - 1
    })
    .then(() => {
      console.log('Trips counter decreased!')
    })
  })
})

export const recountIncomesCount = counterRef.onDelete(event => {
  const incomesRef = event.data.ref.firestore.collection('trips')

  return incomesRef.get()
    .then(querySnapshot => {
      counterRef.set({
        count: querySnapshot.docs.length
      })
    })
})
