const http = require('http');
const KBserver = require("../Server//KBserver")

const hostname = '127.0.0.1';
const port = 3000;
const backend = new KBserver("");

const server = http.createServer((req, res) => {

    if ( req.url.startsWith("/CID=") )
    {
        let cid = req.url.replace("/CID=", "");
        
        let data = backend.GetDataExpressionByCID(cid);

        if ( null == data ) 
        {
            res.statusCode = 404;
            res.end("Unknown CID");

            return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));

        return;
    }
    if ( req.url.startsWith("/REF=") )
    {
        let ref = req.url.replace("/REF=", "");

        let data = backend.GetRawDataByRef(ref);

        if ( null == data ) 
        {
            res.statusCode = 404;
            res.end("Unknown REF");

            return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'binary');
        res.end(Buffer.from(data.buffer));

        return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Unsupported request (SID or REF implemented only)\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`to get data from CID -> http://${hostname}:${port}/CID=FCE90620CE70369D4B6A5554CD8E52CA43B0AE303A9DE8014A5CAA88B310394D`);
  console.log(`to get data from REF -> http://${hostname}:${port}/REF=file1.txt`);
});