import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp({
    apiKey: "AIzaSyCluZSPEzUu_DXDMUoLKPteCadeDI7AArg",
    authDomain: "carbu-meter.firebaseapp.com",
    databaseURL: "https://carbu-meter.firebaseio.com",
    projectId: "carbu-meter",
    storageBucket: "carbu-meter.appspot.com",
    messagingSenderId: "596291489486",
    appId: "1:596291489486:web:0bee780f38cbf791"
})

const database = admin.firestore()

export const tripsCount = functions.firestore
  .document('trips/{tripId}')
  .onWrite(() => {
    const tripsRef = database.collection('trips')

    return database.runTransaction(transaction => {
      return transaction.get(tripsRef).then(tripsQuery => {
        return transaction.update(tripsRef, {
          tripsCount: tripsQuery.size,
        })
      })
    })
  })
