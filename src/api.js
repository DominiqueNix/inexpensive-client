let apiURL;

if(process.env.NODE_ENV === 'development'){
    apiURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
} else if(process.env.NODE_ENV === 'production'){
    apiURL = process.env.REACT_APP_API_URL
} else {
    apiURL = ''
}


export default apiURL;