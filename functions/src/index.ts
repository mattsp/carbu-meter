import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'
import { EventContext } from 'firebase-functions'

admin.initializeApp(functions.config().firebase)

const tripsDocRef = functions.firestore.document('trips/{tripId}')

export const incrementTripsDistance = tripsDocRef.onCreate(
  (event: DocumentSnapshot, context: EventContext) => {
    const tripsDistanceRef = event.ref.firestore.doc(
      'stats/' + context.auth!.uid + '/tripsDistance'
    )
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
          console.log(
            `Trips total distance increased to ${Number(currentCount) +
              (event.data() as any).distance}`
          )
          return 0
        })
    })
  }
)

export const updateTripsDistance = tripsDocRef.onUpdate(
  (event: functions.Change<DocumentSnapshot>, context: EventContext) => {
    const tripsDistanceRef = event.after.ref.firestore.doc(
      'stats/' + context.auth!.uid + '/tripsDistance'
    )

    return tripsDistanceRef.get().then((documentSnapshot: DocumentSnapshot) => {
      const currentCount = documentSnapshot.exists
        ? documentSnapshot.data()!.count
        : 0
      console.log(`currentCount: ${currentCount}`)
      console.log(`Trips distance ${(event.before.data() as any).distance}`)
      return tripsDistanceRef
        .set({
          count:
            Number(currentCount) -
            (event.before.data() as any).distance +
            (event.after.data() as any).distance,
        })
        .then(() => {
          console.log(
            `Trips total distance update to ${Number(currentCount) +
              (event.after.data() as any).distance}`
          )
          return 0
        })
    })
  }
)

export const decrementTripsDistance = tripsDocRef.onDelete(
  (event: DocumentSnapshot, context: EventContext) => {
    const tripsDistanceRef = event.ref.firestore.doc( 'stats/' + context.auth!.uid + '/tripsDistance')

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
          console.log(
            `Trips total distance decreased to ${Number(currentCount) -
              (event.data() as any).distance}`
          )
          return 0
        })
    })
  }
)
