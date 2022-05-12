const exec = require('child_process').exec
exec('/usr/daily-coding-viewer.AppImage', (err, stdout) => {
  if (err) {
    console.log(err)
  }
  console.log(stdout)
})
