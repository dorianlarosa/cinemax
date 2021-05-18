import React, { Component, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";

import { ReactComponent as PlayIcon } from "./utils/play-arrow.svg";
import { ReactComponent as FullScreenIcon } from "./utils/fullscreen.svg";
import { ReactComponent as PauseIcon } from "./utils/pause.svg";
import { ReactComponent as MutedIcon } from "./utils/muted.svg";
import { ReactComponent as UnmutedIcon } from "./utils/unmuted.svg";

import { Duration } from "../";

import "./VideoPlayer.scss";

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      controls: false,
      width: "100%",
      height: "100%",
      muted: false,
      loop: false,
      display: "none",
      fullScreen: false,
      duration: null,
      volume: 0.5,
      currentTime: 0,
    };
  }

  togglePlayVideo = () => {
    if (this.state.playing === true) {
      this.setState({
        playing: false,
      });
    } else {
      this.setState({
        playing: true,
        display: "block",
      });
    }
  };

  playVideo = () => {
    this.setState({
      playing: true,
      display: "block",
    });
  };

  stopVideo = () => {
    setTimeout(() => {
      this.setState({
        playing: false,
        display: "none",
      });
    }, 200);
  };

  toggleFullScreenVideo = (e) => {
    e.stopPropagation();
    screenfull.toggle();

    this.setState((prevState) => ({
      fullScreen: !prevState.fullScreen,
    }));
  };

  updateVolume = (value) => {
    console.log(value);
    this.setState({
      volume: value,
    });
  };

  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ currentTime: parseFloat(e.target.value) });
    e.target.style.backgroundSize =
      parseFloat((parseFloat(e.target.value) / this.state.duration) * 100) +
      "% 3px";

      
  };

  handleProgress = (state) => {
      console.log(state);
    let range = document.getElementById("time-range");

    if (!this.state.seeking) {
      range.style.backgroundSize =
      parseFloat(
           (parseFloat(state.playedSeconds) / this.state.duration) * 100
        ) + "% 3px";

      this.setState({ currentTime: parseFloat(state.playedSeconds) });
    }

    console.log(Math.round(parseFloat(state.playedSeconds)));
    console.log(this.state.duration);


    if (Math.round(parseFloat(state.playedSeconds)) >= this.state.duration - 1) {
       this.stopVideo();
      }
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));

    if (Math.round(parseFloat(e.target.value)) === this.state.duration) {
        this.stopVideo();
       }
  };

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };

  handleVolumeChange = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });

    e.target.style.backgroundSize = parseFloat(e.target.value * 100) + "% 3px";

    if (e.target.value == 0) {
      this.setState({
        muted: true,
      });
    } else {
      this.setState({
        muted: false,
      });
    }
  };

  handleDuration = (duration) => {
    this.setState({ duration: duration });
  };

  ref = (player) => {
    this.player = player;
  };

  componentDidUpdate(prevProps) {
    if (this.props.canPlayVideo === false) {
      this.stopVideo();
    }
  }

  render() {
    const {
      playing,
      controls,
      width,
      height,
      muted,
      loop,
      display,
      fullScreen,
      duration,
      volume,
      currentTime,
    } = this.state;

    let classVideoPlaying = playing ? " play" : "";
    let classVideoFullScreen = fullScreen ? " full-screen" : "";

    return (
      <>
        {this.props.url ? (
          <>
            <div
              className={"video" + classVideoPlaying + classVideoFullScreen}
              style={{
                backgroundImage: `url("${this.props.background_image}")`,
              }}
              onClick={this.togglePlayVideo}
            >

              {/* @todo toggle play/pause icon */}
              <div className="container-play-icon">
                <PlayIcon />
              </div>

              <div
                className="video-player"
                style={{
                  display: display,
                }}
              >
                <ReactPlayer
                  ref={this.ref}
                  url={this.props.url}
                  muted={muted}
                  playing={playing}
                  volume={volume}
                  loop={loop}
                  controls={controls}
                  width={width}
                  height={height}
                  onDuration={this.handleDuration}
                  onProgress={this.handleProgress}
                />
                <div
                  className="container-controls"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="controls">
                    <button
                      onClick={this.togglePlayVideo}
                      className="btn-control"
                    >
                      <PlayIcon
                        className={!playing ? "svg_play_pause" : "hide"}
                      />

                      <PauseIcon
                        className={!playing ? "hide" : "svg_play_pause"}
                      />
                    </button>

                    <span className="time">
                      <Duration seconds={currentTime} /> /{" "}
                      <Duration seconds={duration} />
                    </span>

                    <input
                      id="time-range"
                      type="range"
                      className="time-range"
                      onMouseDown={this.handleSeekMouseDown}
                      onChange={this.handleSeekChange}
                      onMouseUp={this.handleSeekMouseUp}
                      value={currentTime}
                      step={1}
                      min={0}
                      max={duration}
                    />
                    <div className="control-sounds">

                    <button
                      onClick={this.handleToggleMuted}
                      className="btn-control"
                    >
                      <UnmutedIcon
                        className={muted ? "hide" : "svg_mute_unmute"}
                      />
                      <MutedIcon
                        className={muted ? "svg_mute_unmute" : "hide"}
                      />
                    </button>

                    <input
                      type="range"
                      className="volume-range"
                      onChange={this.handleVolumeChange}
                      value={volume}
                      step={0.1}
                      min={0}
                      max={1}
                    />

                    </div>

                    <div
                      className="btn-control"
                      onClick={this.toggleFullScreenVideo}
                    >
                      <FullScreenIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-controls-video"></div>
            </div>
          </>
        ) : (
          <>
            <div
              className={"video" + classVideoPlaying + classVideoFullScreen}
              style={{
                backgroundImage: `url("${this.props.background_image}")`,
              }}
            ></div>
          </>
        )}
      </>
    );
  }
}

export default MovieDetails;
