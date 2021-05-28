import React, { useState, useEffect } from 'react'
import { View, Text ,StyleSheet, FlatList, TouchableOpacity, Image, Dimensions  } from 'react-native'
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons'
import { Audio } from 'expo-av';
const x = Dimensions.get('screen').width
const y = Dimensions.get('screen').height

var axios = require('axios')
var databaseUrl = 'https://storage-7f406-default-rtdb.asia-southeast1.firebasedatabase.app/user/userId/highScore.json'

export default function TabScreen() {
    let [time, setTime] = useState(3000)
    let [blocks, setBlocks] = useState(blocksArr)
    let [score, setScore] = useState(0)
    let [curScore, setCurScore] = useState(0)
    let [highestScore, setHighestScore] = useState(0)
    let [status, setStatus] = useState('Play')
    let [winner, setWinner] = useState(0)
    
    let blocksArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    
    const random = () => {
        setBlocks(blocksArr.sort(() => Math.random() - 0.5 ))
    }
    
    useEffect(() => {
        const timer = setInterval(random, time)
        return () => clearInterval(timer)
    }, [random])
    
    const initialLizeGame = () => {
        setTime(3000)
        setBlocks(blocksArr)
        setScore(0)
        setStatus('Play')
        postScore()
    }

    async function playSoundPing() {
        const { sound } = await Audio.Sound.createAsync(
          require('../audio/TabSound/ting.mp3')
        )
        await sound.playAsync()
    }

    async function playSoundLose() {
        const { sound } = await Audio.Sound.createAsync(
          require('../audio/TabSound/lose.mp3')
        )
        await sound.playAsync()
    }

    const chooseHandler = (blockValue) => {
        if (blockValue == 5) {
            playSoundPing()
            setScore(score+1)
            if(score == 9){
                setWinner(true)
                setStatus('Win')
            }
            if( time > 2000 ) setTime(time => time - 350)
            if( time > 1000) setTime(time => time - 250)
            if( time > 300) setTime(time => time - 200) 
            random()
        } else {
            playSoundLose()
            setCurScore(score)
            setStatus('Lose')
        }
        if(score > highestScore){
            setHighestScore(score)
        }
    }
      
    const postScore = () => {
        fetch(databaseUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            scoreTab: highestScore
          })
        })
      }
    
    useEffect(() => {
        axios.get(databaseUrl)
        .then((res) => {
          setHighestScore(res.data.scoreTab)
        })
      }, [])

    if(status=='Play'){
        return (
            <View style={styles.container}>
                <Image source={require('../img/tabtheblack/logo.png')} style={{width: 350, height: 80, top: '1%'}}/>
                <Text style={styles.score1}>{score}</Text>
                <View style={styles.flatlist}>
                    <FlatList 
                        renderItem={({ item }) =>
                            <TouchableOpacity 
                                onPress={() => chooseHandler(item)} 
                                style={item == 5 ? styles.black : styles.tile }>
                            </TouchableOpacity>}
                        keyExtractor={(item) => item}
                        data={blocks}
                        numColumns={3}
                    />
                </View>
            </View>
        )
    } else if(status == 'Lose') {
        return (
            <View style={styles.container1}>
                <View style={styles.board}>
                    <Text style={styles.score1}>Highest score: {!winner ? highestScore: 10}</Text>
                    <Text style={styles.score}>Your score: {curScore}</Text>
                    <Text style={styles.try}>Try again ... ?</Text>
                    <TouchableOpacity style={styles.button} onPress={() => initialLizeGame()}>
                        <Icon name="reload" style={styles.re}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Image source={require('../img/tabtheblack/congratulation.png')} style={{position: 'absolute', width:x, height: y}} />
                <View style={styles.boardWin}>
                    <Image style={styles.img} source={require("../img/tabtheblack/win.png")} />
                    <Text style={styles.score}>Highest score: 10</Text>
                    <Text style={styles.try}>5% people can win this game</Text>
                    <TouchableOpacity style={styles.button} onPress={() => initialLizeGame()}>
                        <Icon name="reload" style={styles.re}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center'
    },
    container1: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatlist: { 
        shadowColor: '#4a4a4a', 
        shadowOpacity: 0.8, 
        shadowOffset: {width: 10, height: 10},
        backgroundColor: '#b1b0b0',
        flexGrow: 0,
        top: '13%',
        height: x*0.85,
        width: x*0.85,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#49470a",
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: '30%',
    },
    score1: {
        fontSize: 40,
        fontWeight: 'bold',
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: {width: -3, height: 3},
        shadowOpacity: 0.5,
    },
    tile: {
        borderWidth: 2,
        borderRadius: 10,
        margin: 10,
        borderColor: '#929292',
        backgroundColor: '#ffffff',
        width: x*0.85*0.25,
        height: x*0.85*0.25,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#4a4a4a', 
        shadowOpacity: 1, 
        shadowOffset: {width: 3, height: 5},
    },
    black: {
        borderWidth: 2,
        borderRadius: 10,
        margin: 10,
        borderColor: '#929292',
        backgroundColor: "black",
        width: x*0.85*0.25,
        height: x*0.85*0.25,
        shadowColor: '#4a4a4a', 
        shadowOpacity: 1, 
        shadowOffset: {width: 3, height: 5},
        
    },
    board: {
        backgroundColor: '#cacdca',
        width: 350,
        height: 350,
        shadowColor: '#000',
        shadowOffset: {width: -10, height: 10},
        shadowOpacity: 0.5,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#dadcdc",
        bottom: 30,
        alignItems: 'center'
    },
    score: {
        fontSize: 35,
        paddingVertical: 30,
        fontFamily: 'Helvetica',
        shadowColor: '#000',
        shadowOffset: {width: -5, height: 3},
        shadowOpacity: 0.5
    },
    try: {
        fontSize: 20,
        paddingBottom: 25,
        fontFamily: 'Helvetica',
        shadowColor: '#000',
        shadowOffset: {width: -5, height: 3},
        shadowOpacity: 0.5
    },
    re: {
        fontSize: 35,
        color: '#221713',
    },
    button: {
        borderWidth: 2,
        borderColor: '#dbdbdb',
        borderRadius: 10,
        width: 130,
        height: 70,
        backgroundColor: '#b7b7b7',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: -5, height: 3},
        shadowOpacity: 0.5
    },
    boardWin: {
        backgroundColor: "#fdfdfd",
        width: 355,
        height: 355,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: -10, height: 10},
        shadowOpacity: 0.5,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#dadcdc"
    },
    img: {
        width: 350,
        height: 350,
        flex:1,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#dadcdc'
    }
})
