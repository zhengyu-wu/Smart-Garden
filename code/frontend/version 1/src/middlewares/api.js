import { START, SUCCESS, FAIL } from '../constants/ActionTypes'

const FAIL_RES= {
    "Auth":"Denied"
}

const SUCCESS_RES = {
    "Auth":"Logged",
    "Language":"EN"
}

//
const request = (resolve, reject) => {
    return () => {

        //  Fail on server validation
        const validationFail = Math.random() < 0.5;
        if (validationFail) return reject(FAIL_RES);

        return resolve(SUCCESS_RES);
    }
}

const httpGet = (url,values)=>{
    return new Promise(
        (resolve, reject) => setTimeout(request( resolve, reject), 900)
    );

}


export default store => next => action => {
    const { api , type , ...rest } = action
    if(!api) return next(action)

    next({
        type: type + START,
        ...rest
    })

    
    httpGet(api,...rest)
        .then(
            response => {

                return next({type: type + SUCCESS, response, ...rest})
            },
            error => {
                return next({type: type + FAIL, error, ...rest})
            }
        );


}

/*
const httpGet = (url) => {

    return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('Post', url, true);

        xhr.onload = function() {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });

}*/
