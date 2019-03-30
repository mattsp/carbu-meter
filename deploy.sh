  #!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ]; then
  firebase deploy --token $firebase_token
fi