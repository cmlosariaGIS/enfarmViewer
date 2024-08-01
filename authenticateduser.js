function getAuthenticatedUserID(){const userID=localStorage.getItem('userId');if(userID){return parseInt(userID,10);}
return null;}
const authenticatedUserIDs=[];const currentUserID=getAuthenticatedUserID();if(currentUserID!==null){authenticatedUserIDs.push(currentUserID);}
console.log('Authenticated User IDs:',authenticatedUserIDs);function isUserAuthenticated(userID){return authenticatedUserIDs.includes(userID);}