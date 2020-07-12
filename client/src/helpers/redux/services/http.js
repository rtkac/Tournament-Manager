import request from 'isomorphic-fetch';

const fetch = (url, opts, anonymous = false) => {
    const newOpts = {
        ...opts,
    };

    newOpts.credentials = 'include';
    
    if (anonymous) {
        newOpts.headers = {
            ...newOpts.headers,
            Accept: 'application/json',
            'Strict-Transport-Security': 'max-age=31536000 ; includeSubDomains',
        };
    } else {
        newOpts.headers = {
            ...newOpts.headers,
            // 'X-Forwarded-Host': 'zentity.com',
            // 'sec-fetch-site': 'cross-site',
            // authority: 'zentity.com',
            Accept: newOpts.headers && newOpts.headers.Accept ? newOpts.headers.Accept : 'application/json',
            'Strict-Transport-Security': 'max-age=31536000 ; includeSubDomains',
            'Content-Type': newOpts.headers && newOpts.headers['Content-Type'] ? newOpts.headers['Content-Type'] : 'application/json',
        };
        // newOpts.credentials = 'include';
    }

    return request(url, newOpts);
};

export default fetch;