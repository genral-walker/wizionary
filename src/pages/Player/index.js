import WaveSurfer from 'wavesurfer.js';
import PlayerWrapper from './style';
import audioImg from 'assets/bg-9.jpg';
import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { ReactComponent as PauseIcon } from 'assets/pause.svg';
import { ReactComponent as StopIcon } from 'assets/stop.svg';
import { ReactComponent as ZoomInIcon } from 'assets/zoom-in.svg';
import { ReactComponent as ZoomOutIcon } from 'assets/zoom-out.svg';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import testAudio from 'assets/test-audio.weba';

const Player = () => {
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [zoomX, setZoomX] = useState(0);
  const waveformContainerRef = useRef(null);
  const wavesurfer = useRef(null);

  const resolveTimeFormat = (totalSeconds) => {
    if (!totalSeconds) return '0:00';

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${minutes}:${
      seconds ? (seconds < 10 ? '0' + seconds : seconds) : '00'
    }`;
  };

  useEffect(() => {
    if (waveformContainerRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: 'aliceblue',
        progressColor: '#df9e4a',
        barWidth: 2,
        url: testAudio,
        height: 70,
        responsive: true,
        hideScrollbar: true,
        barRadius: 4,
        autoCenter: true,
        minPxPerSec: 0,
      });
    }

    wavesurfer.current.on('ready', () => {
      setDuration(wavesurfer.current.getDuration());
    });

    wavesurfer.current.on('timeupdate', (currentTime) => {
      setCurrentTime(currentTime);
    });

    wavesurfer.current.on('finish', () => {
      setPlay(false);
    });

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, []);

  return (
    <PlayerWrapper showZoom={duration}>
      <div>
        <img src={audioImg} alt="current audio" />

        <div>
          <p className="title">Wizionary - Drupal Arts</p>

          <div ref={waveformContainerRef} className="wave" />

          <div className="controls">
            {play ? (
              <PauseIcon
                onClick={() => {
                  wavesurfer.current.pause();
                  setPlay(false);
                }}
              />
            ) : (
              <PlayIcon
                onClick={() => {
                  wavesurfer.current.play();
                  setPlay(true);
                }}
              />
            )}

            <StopIcon
              className="stop"
              onClick={() => {
                wavesurfer.current.stop();
                setPlay(false);
              }}
            />

            <ZoomOutIcon
              className="zoomOut"
              onClick={() => {
                if (zoomX !== 0) {
                  setZoomX((prev) => {
                    const newValue = prev - 10;
                    wavesurfer.current.zoom(newValue);
                    return newValue;
                  });
                }
              }}
            />

            <ZoomInIcon
              className="zoomIn"
              onClick={() => {
                if (zoomX < 50) {
                  setZoomX((prev) => {
                    const newValue = prev + 10;
                    wavesurfer.current.zoom(newValue);
                    return newValue;
                  });
                }
              }}
            />

            <span>
              {resolveTimeFormat(currentTime)} / {resolveTimeFormat(duration)}
            </span>
          </div>
        </div>
      </div>
    </PlayerWrapper>
  );
};

export default Player;
