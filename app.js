const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');
// End of main program

function getFromClient(request,response){
    var url_parts = url.parse(request.url, true);

    switch (url_parts.pathname) {

        case '/':
            response_index(request, response);
            break;    
        
        case '/other':
            response_other(request, response);
            break;    
        
        case '/style.css':
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(style_css);
            response.end();
            break;    
        
        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('no page...');
            break;
    }
}

var data = {msg:'no message...'};

// access transaction
function response_index(request, response) {
    // access throgh POST 
    if (request.method == 'POST') {
        
        var body='';
        
        // receive data
        request.on('data', (data) => {
            body +=data;
        });
        
        // end of receiving data
        request.on('end',() => {
            data = qs.parse(body);
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}

// index
function write_index(request, response) {
    var msg = "※伝言を表示します。"
    var content = ejs.render(index_page, {
        title:"Index",
        content:msg,
        data:data,
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}