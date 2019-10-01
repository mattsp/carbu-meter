import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'

admin.initializeApp(functions.config().firebase)

const tripsDocRef = functions.firestore.document('trips/{tripId}')

export const incrementTripsDistance = tripsDocRef.onCreate(
  (event: DocumentSnapshot) => {
    const userRef = event.ref.firestore.collection(
      'users'
    ).doc((event.data() as any).userRef)

    return userRef.get().then((documentSnapshot: DocumentSnapshot) => {
      const tripsTotalDistance = documentSnapshot.exists
        ? documentSnapshot.data()!.tripsTotalDistance
        : 0
      console.log(`tripsTotalDistance: ${tripsTotalDistance}`)
      console.log(`User id ${(event.data() as any).userRef}`)
      return userRef
        .set({
          tripsTotalDistance: Number(tripsTotalDistance) + (event.data() as any).distance,
        })
        .then(() => {
          console.log(
            `Trips total distance increased to ${Number(tripsTotalDistance) +
              (event.data() as any).distance}`
          )
          return 0
        })
    })
  }
)

export const updateTripsDistance = tripsDocRef.onUpdate(
  (event: functions.Change<DocumentSnapshot>) => {
    const userRef = event.after.ref.firestore.collection(
      'users'
    ).doc((event.after.data() as any).userRef)

    return userRef.get().then((documentSnapshot: DocumentSnapshot) => {
      const tripsTotalDistance = documentSnapshot.exists
        ? documentSnapshot.data()!.tripsTotalDistance
        : 0
      console.log(`tripsTotalDistance: ${tripsTotalDistance}`)
      console.log(`User id ${(event.before.data() as any).userRef}`)
      return userRef
        .set({
          tripsTotalDistance:
            Number(tripsTotalDistance) -
            (event.before.data() as any).distance +
            (event.after.data() as any).distance,
        })
        .then(() => {
          console.log(
            `Trips total distance update to ${Number(tripsTotalDistance) +
              (event.after.data() as any).tripsTotalDistance}`
          )
          return 0
        })
    })
  }
)

export const decrementTripsDistance = tripsDocRef.onDelete(
  (event: DocumentSnapshot) => {
    const userRef = event.ref.firestore.collection(
      'users'
    ).doc((event.data() as any).userRef)

    return userRef.get().then((documentSnapshot: DocumentSnapshot) => {
      const tripsTotalDistance = documentSnapshot.exists
        ? documentSnapshot.data()!.tripsTotalDistance
        : 0
      console.log(`tripsTotalDistance: ${tripsTotalDistance}`)
      console.log(`User id ${(event.data() as any).userRef}`)
      return userRef
        .set({
          tripsTotalDistance: Number(tripsTotalDistance) - (event.data() as any).distance,
        })
        .then(() => {
          console.log(
            `Trips total distance decreased to ${Number(tripsTotalDistance) -
              (event.data() as any).distance}`
          )
          return 0
        })
    })
  }
)
