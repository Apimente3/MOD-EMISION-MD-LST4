let env = process.env.NODE_ENV;
console.log('************evn****************')
console.log(env)
let port = 3000;
let url_front = 'http://localhost:4200';
let url_annotator = 'http://pre.emerita.legal:9090';
let url_filter_annotator = 'http://pre.emerita.legal:9091';
if (env === 'test') {
    port = 3001;
    url_front = 'http://pruebas.emerita.legal';
} else if (env === 'production') {
    port = 13727;
    url_front = 'https://emerita.legal';
}
module.exports = {
    port: port,
    url_front: url_front,
    url_annotator,
    url_filter_annotator
};
