module.exports =  {

logMiddleware : function   ({ dispatch, getState }) {
    //next et la fonction "createstore" qui prend en paramètre reducers et initialstate
    return function(next) {
        return function (action) {
            console.log('logMiddleware action received:', action)
            return next(action)
        }
    }
},
// Same below for a middleware to discard all actions that goes through (not very useful as is
// but with a bit of more logic it could selectively discard a few actions while passing others
// to next middleware or Redux):
discardMiddleware: function  ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('discardMiddleware action received:', action)
        }
    }
},
thunkMiddleware : function  ({ dispatch, getState }) {
     console.log('[thunkMiddleware] Enter thunkMiddleware');
    return function(next) {
         console.log('[thunkMiddleware] Function "next" provided:', next);
        return function (action) {
             console.log('[thunkMiddleware] Handling action:', action);
             return typeof action === 'function'?
                action(dispatch, getState):
                next(action)
        }
    }
}


}