export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, date, then, thenParams, ...rest } = action;
   
    if (!promise) return next(action);
   console.log('promise middleware ', action)
    const SUCCESS = type;
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';
    next({ ...rest, date, type: REQUEST });
    return promise
      .then(res => {
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
        next({ ...rest, error, date, dateEnd : Date.now(), type: FAILURE });
        
        // Another benefit is being able to log all failures here 
        console.log(error);
        return false;
      });
   };
}
