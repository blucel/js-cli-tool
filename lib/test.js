
const {Client} = require('ssh2')
function test() {
  const conn = new Client();
  conn.on('ready', function(err, stream) {
    conn.exec('npm -v', function(
      err,
      stream
    ) {
      if (err) throw err;
      stream.on('close', function(code, signal){
        console.log(code, signal,'close')
      }).on('data', function(code, signal){
        console.log(code, signal, 'data')
      })
      .stderr.on('data', function(code, signal) {
        console.log(code, signal, 'stderr')
      })
    })
  })
  .connect({
    host: host,
    port: port,
    username: username,
    password: password
  })
}

module.exports = test