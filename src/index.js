import { spawn } from 'child_process';

export default function converter(movFile, outputFilename, options) {
  const ffmpeg = spawn('ffmpeg', [
    '-i', movFile,
    '-vf', 'scale=400:-1',
    '-r', options.frame,
    '-f', 'gif', '-',
  ]);
  const gifsicle = spawn('gifsicle', [
    `--optimize=${options.optimize}`,
    `--delay=${options.delay}`,
    '-o', outputFilename,
  ]);
  ffmpeg.stdout.pipe(gifsicle.stdin);
  gifsicle.on('close', () => {
    console.log('Converted');
  });
}
