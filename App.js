import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert, 
  Button,
  ToastAndroid,
  AsyncStorage } from 'react-native';
//import { AsyncStorage } from '@react-native-community/async-storage'
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentlePlay: 1,
      btnTitle: 'Start New Game',
      touch: true,
      gameInProgress: false,
      finishCounter: 1,
      plays: 0,
    }
  }

  stateChange = () => {
    this.setState({
      touch: false,
      btnTitle: 'Restart Game',
      gameInProgress: true
    })
  }

  componentDidMount() {
    this.iniciaGame()
  }

  ganhador = () => {
    const NUM_CELAS = 3;
    let arr = this.state.gameState;
    let sum;

    // horizontal
    for (var i = 0; i < NUM_CELAS; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2]
      if (sum == 3) { return 1 }
      else if (sum == -3) { return -1 }
    }

    // vertical
    for (var i = 0; i < NUM_CELAS; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i]
      if (sum == 3) { return 1 }
      else if (sum == -3) { return -1 }
    }

    // diagonais
    sum = arr[0][0] + arr[1][1] + arr[2][2]
    if (sum == 3) { return 1 }
    else if (sum == -3) { return -1}

    sum = arr[2][0] + arr[1][1] + arr[0][2]
    if (sum == 3) { return 1 }
    else if (sum == -3) { return -1}
    
    // add +1 ao marcador de jogadas
    this.setState({
      plays: this.state.plays + 1
    })
    if (this.state.plays >= 8) { return 0 }
  }

  // estado inicial 
  iniciaGame = () => {
    this.setState({gameState: 
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentlePlay: 1,
      btnTitle: 'Start New Game',
      touch: true,
      gameInProgress: false,
      plays: 0
    });
  }

  // Contador de jogos terminados 
  addFinishCounter = () => {
    this.setState({
      finishCounter: this.state.finishCounter + 1
    })
    if (this.state.finishCounter == 5) {
      Alert.alert('5 games finished')
    }
  }

  // ReStart
  newGame = () => {
    Alert.alert('Alert', 
    'Do you want to restart the game?',
    [
      {text: 'OK', onPress: () => this.iniciaGame()},
      {text: 'Cancel'}
    ]);
  }

  celaEscolha = (h, v) => {
    // não muda uma cela ja escolhida
    let vlue = this.state.gameState[h][v]
    if (vlue !== 0) { return }

    // pega o turno atual
    let turno = this.state.currentlePlay

    // define o marcador
    let arr = this.state.gameState.slice()
    arr[h][v] = turno
    this.setState({gameState: arr})

    // troca de turno
    let changeTurn = (turno == 1) ? -1 : 1;
    this.setState({currentlePlay : changeTurn})

    //check
    var ganhador = this.ganhador()
    if (ganhador == 1) {
      Alert.alert('Player 1 Wins')
      this.addFinishCounter()
      this.iniciaGame()
    } else if (ganhador == -1) {
      Alert.alert('Player 2 Wins')
      this.addFinishCounter()
      this.iniciaGame()
    } else if (ganhador == 0) {
      Alert.alert('It`s a Tie')
      this.addFinishCounter()
      this.iniciaGame()
    }
  }

  renderMarcador = (h, v) => {
    let vlue = this.state.gameState[h][v];
    switch(vlue) 
    {
      case 1 : return  <Icon name="close" style={styles.marcadores}/>;
      case -1 : return  <Icon name="circle-outline" style={styles.marcadores}/>;
      default: return <View/>
    }
  }
  
  render() {
    return (
      <View style={styles.container}>

        <Text>
          This is the number: { this.state.finishCounter }
        </Text>

        <View style={{ borderTopWidth: 30 }}/>
  
        <View style={styles.caixaExterna}>
          <TouchableOpacity disabled={this.state.touch} onPress={() => this.celaEscolha(0,0)} style={[styles.celas, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            { this.renderMarcador(0, 0) }
          </TouchableOpacity>

          <TouchableOpacity disabled={this.state.touch} onPress={() => this.celaEscolha(0,1)} style={[styles.celas, { borderTopWidth: 0 }]} >
            { this.renderMarcador(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity disabled={this.state.touch} onPress={() => this.celaEscolha(0,2)} style={[styles.celas, { borderRightWidth: 0, borderTopWidth: 0 }]} >
            { this.renderMarcador(0, 2)}
          </TouchableOpacity>
        </View>
  
        <View style={styles.caixaExterna}>
          <TouchableOpacity disabled={this.state.touch} onPress={() => this.celaEscolha(1,0)} style={[styles.celas, { borderLeftWidth: 0 }]} >
            { this.renderMarcador(1, 0) }
          </TouchableOpacity>

          <TouchableOpacity disabled={this.state.touch} onPress={() => this.celaEscolha(1,1)} style={[styles.celas, {  }]} >
            { this.renderMarcador(1, 1) }
          </TouchableOpacity>

          <TouchableOpacity disabled={this.state.touch} onPress={() => this.celaEscolha(1,2)} style={[styles.celas, { borderRightWidth: 0 }]} >
            { this.renderMarcador(1, 2) }
          </TouchableOpacity>
        </View>
  
        <View style={styles.caixaExterna}>
          <TouchableOpacity disabled={this.state.touch} onPress={() => this.celaEscolha(2,0)} style={[styles.celas, { borderLeftWidth: 0, borderBottomWidth: 0 }]} >
            { this.renderMarcador(2, 0) }
          </TouchableOpacity>

          <TouchableOpacity disabled={this.state.touch} onPress={() => this.celaEscolha(2,1)} style={[styles.celas, { borderBottomWidth: 0 }]} >
            { this.renderMarcador(2, 1) }
          </TouchableOpacity>

          <TouchableOpacity disabled={this.state.touch} onPress={() => this.celaEscolha(2,2)} style={[styles.celas, { borderBottomWidth: 0, borderRightWidth: 0 }]} >
            { this.renderMarcador(2, 2) }
          </TouchableOpacity>
        </View>

        <View style={{ borderTopWidth: 60 }}/>

        <Button title={ this.state.btnTitle } 
        onPress={ (this.state.gameInProgress) ? () => this.newGame() : () => this.stateChange() } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  caixaExterna: {
    flexDirection: 'row',
  },
  celas: {
    borderWidth: 2,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marcadores: {
    color: '#005068',
    fontSize: 70,
  }
});
