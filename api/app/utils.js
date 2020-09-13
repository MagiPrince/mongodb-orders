exports.logReq = (req) => {
    console.log('METHOD:', req.method);
    console.log('ENDPOINT:', req.originalUrl);
    console.log('HEADERS:', req.headers);
    console.log('PARAMS:', req.params);
    console.log('BODY:', req.body);
}
