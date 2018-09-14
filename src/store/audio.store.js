const state = {
  audioFile: "/sounds/tone.mp3",
  player: null,
  isPlaying: false
};
const mutations = {
  initPlayer(state) {
    let newPlayer = new Audio(state.audioFile);
    newPlayer.loop = true;
    state.player = newPlayer;
  },
  toggleState(state, status) {
    state.isPlaying = status;
    if (status) {
      // state.player.play();
    } else {
      state.player.pause();
      state.player.currentTime = 0;
    }
  }
};
const actions = {
  initAudioPlay({ commit }) {
    commit("initPlayer");
  },
  playAudio({ commit }) {
    commit("toggleState", true);
  },
  stopAudio({ commit }) {
    commit("toggleState", false);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
