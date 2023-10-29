/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions/v2");
setGlobalOptions({maxInstances: 10});

const functions = require("firebase-functions");
const {getAuth} = require("firebase-admin/auth");
const admin = require('firebase-admin');
admin.initializeApp();

const {
    log
} = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.verifyEmailForGithubUsers = functions.auth.user().onCreate((user) => {
    /*
    This check only works when there is one provider ID, and needs to be changed if the ability to have multiple providers per account is enabled.
     */
    if (user.providerData[0].providerId === 'github.com') {
        getAuth().updateUser(user.uid, {
            emailVerified: true,
        }).then((userRecord) => {
        log('Successfully updated user', userRecord.toJSON());
        }).catch((error) => {
            log('Error updating user:', error);
        });
    }
});