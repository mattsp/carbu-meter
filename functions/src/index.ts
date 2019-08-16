
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { QuerySnapshot } from '@google-cloud/firestore';

admin.initializeApp(functions.config().firebase)

const tripsDocRef = functions.firestore.document('trips/{tripId}')
const counterDocRef = functions.firestore.document('counters/trips')

export const incrementTripsCounter = tripsDocRef.onCreate((event: DocumentSnapshot) => {
  const counterRef = event.ref.firestore.doc('counters/trips')

  return counterRef.get().then((documentSnapshot: any) => {
    const currentCount = documentSnapshot.exists
      ? documentSnapshot.data().count
      : 0

    return counterRef
      .set({
        count: Number(currentCount) + 1,
      })
      .then(() => {
        console.log('Trips counter increased!')
      })
  })
})

export const decrementTripsCounter = tripsDocRef.onDelete((event: DocumentSnapshot) => {
  const counterRef = event.ref.firestore.doc('counters/trips')

  return counterRef.get().then((documentSnapshot: any) => {
    const currentCount = documentSnapshot.exists
      ? documentSnapshot.data().count
      : 0

    return counterRef
      .set({
        count: Number(currentCount) - 1,
      })
      .then(() => {
        console.log('Trips counter decreased!')
      })
  })
})

export const recountTripsCount = counterDocRef.onDelete((event: DocumentSnapshot) => {
  const tripsRef = event.ref.firestore.collection('trips')
  const counterRef = event.ref.firestore.doc('counters/trips')
  return tripsRef.get().then((querySnapshot: QuerySnapshot) => {
    return counterRef.set({
      count: querySnapshot.docs.length,
    })
  })
})
