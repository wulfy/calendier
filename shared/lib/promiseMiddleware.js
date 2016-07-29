export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, date, then, thenParams, ...rest } = action;
   
   //ne traite que les actions contenant une variable "promise"
    if (!promise) return next(action);
   console.log('promise middleware ', action)
    const SUCCESS = type;
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';
    //transmet l'action aux autres middlewares
    next({ ...rest, date, type: REQUEST });
    //retourne une promesse
    return promise
      .then(res => {
        //si l'action est réussie ,  transmet la réussite aux autres middleware
        next({ ...rest, res, date, dateEnd : Date.now(), type: SUCCESS });
        //gestion d'un éventuel callback
        if(typeof then != "undefined")
          {
            console.log("then");
            then(thenParams);
          }

        return true;
      })
      .catch(error => {
        //si erreur la transmet aux autres middleware
        next({ ...rest, error, date, dateEnd : Date.now(), type: FAILURE });
        
        // Another benefit is being able to log all failures here 
        console.log(error);
        return false;
      });
   };
}
