
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

admin.initializeApp(functions.config().firebase)

const tripsDocRef = functions.firestore.document('trips/{tripId}')

export const incrementTripsDistance = tripsDocRef.onCreate((event: DocumentSnapshot) => {
  const tripsDistanceRef = event.ref.firestore.doc('counters/tripsDistance')

  return tripsDistanceRef.get().then((documentSnapshot: DocumentSnapshot) => {
    const currentCount = documentSnapshot.exists
      ? documentSnapshot.data()!.count
      : 0
    console.log(`currentCount: ${currentCount}`)
    console.log(`Trips distance ${(event.data() as any).distance}`)
    return tripsDistanceRef
      .set({
        count: Number(currentCount) + (event.data() as any).distance,
      })
      .then(() => {
        console.log(`Trips total distance increased to ${Number(currentCount) + (event.data() as any).distance}`)
        return 0;
      })
  })
})

export const decrementTripsDistance = tripsDocRef.onDelete((event: DocumentSnapshot) => {
  const tripsDistanceRef = event.ref.firestore.doc('counters/tripsDistance')

  return tripsDistanceRef.get().then((documentSnapshot: DocumentSnapshot) => {
    const currentCount = documentSnapshot.exists
      ? documentSnapshot.data()!.count
      : 0
      console.log(`currentCount: ${currentCount}`)
      console.log(`Trips distance ${(event.data() as any).distance}`)
    return tripsDistanceRef
      .set({
        count: Number(currentCount) - (event.data() as any).distance,
      })
      .then(() => {
        console.log(`Trips total distance decreased to ${Number(currentCount) - (event.data() as any).distance}`)
        return 0;
      })
  })
})
