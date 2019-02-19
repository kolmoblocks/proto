var fs = require('fs');
const http = require('http');
const KBserver = require("../Server//KBserver")

const hostname = '127.0.0.1';
const port = 3000;

const backend = new KBserver("");

const req1 = '/MANIFEST_BY_DOI=';
const req2 = '/DATA_BY_DOI=';

const req1_msg = `To get manifest by DOI -> http://${hostname}:${port}` + req1 + 'FCE90620CE70369D4B6A5554CD8E52CA43B0AE303A9DE8014A5CAA88B310394D';
const req2_msg = `To get data by DOI -> http://${hostname}:${port}` + req2 + '2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824';

const server = http.createServer((req, res) => {

    if ( req.url.startsWith(req1) )
    {
        let doi = req.url.replace(req1, "");
        
        let data = backend.GetManifestByDOI(doi);

        if ( null == data ) 
        {
            res.statusCode = 404;

            res.end("Unknown DOI");

            return;
        }

        res.statusCode = 200;

        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(data));

        console.log('Manifest request processed for ' + doi);

        return;
    }


    if ( req.url.startsWith(req2) )
    {
        let doi = req.url.replace(req2, "");

        let data = backend.GetDataByDoi(doi);

        if ( null == data ) 
        {
            res.statusCode = 404;

            res.end("Unknown DOI");

            return;
        }

        res.statusCode = 200;

        res.setHeader('Content-Type', data["MIME"]);

        res.end(Buffer.from(data.buffer));

        console.log(`Data request processed for ` + doi);

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

    res.end("Supported only\n" + req1_msg + "\n" + req2_msg);
});

server.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}/`);

    console.log(req1_msg);

    console.log(req2_msg);
    
});