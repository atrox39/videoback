const { Movie } = require('./src/database/models/movie.model');
const path = require('path');
const fs = require('fs');
const {spawn} = require('child_process');
const movies = path.join(__dirname, 'src', 'movies');
const files = fs.readdirSync(movies);
files.map((file, i)=>{
    if(file.endsWith('.mp4') || file.endsWith('.avi')){
        let open = fs.readFileSync(path.join(movies, file));
        let mbSize = (open.byteLength / 1024 / 1024).toPrecision(3);
        console.log(mbSize);
    }
});

/*
const file = path.join(__dirname, 'src', 'movies', 'test.mp4');
const fileData = fs.readFileSync(file);
const mbSize = (fileData.byteLength / 1024 / 1024).toPrecision(3);

console.log(`${mbSize} Mb`);

const child = spawn('ffprobe', ['-show_format', '-print_format', 'json', file], {shell:true});

child.stdout.on('data', (data)=>{
    console.log(Buffer.from(data).toString('utf-8'));
});

child.stderr.on('data', (data)=>{
    console.log(Buffer.from(data).toString('utf-8'));
});

child.on('close', (code)=>{
    console.log('code: '+code);
});*/