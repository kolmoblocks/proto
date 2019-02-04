var fs = require('fs');
const http = require('http');
const KBserver = require("../Server//KBserver")

const hostname = '127.0.0.1';
const port = 3000;
const backend = new KBserver("");
const cid_msg = `To get data from CID -> http://${hostname}:${port}/CID=FCE90620CE70369D4B6A5554CD8E52CA43B0AE303A9DE8014A5CAA88B310394D`;
const ref_msg = `To get data from REF -> http://${hostname}:${port}/REF=file1.txt`;

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

        console.log(`CID Request processed for ` + cid);

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

        console.log(`REF Request processed for ` + ref);

        return;
    }

    
    if ( req.url.endsWith(".html") || req.url.endsWith(".js") )
    {
        let data = fs.readFileSync(process.cwd() + '/../Scripts/Browser' + req.url);

        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();

        console.log(`Request processed for ` + req.url);
        
        return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Supported only\n" + cid_msg + "\n" + ref_msg);
});

server.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}/`);

    console.log(cid_msg);

    console.log(ref_msg);
    
});